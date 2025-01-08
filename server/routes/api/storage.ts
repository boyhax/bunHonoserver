import { JwtMiddlware } from "@/middleware/jwt";
import { Product } from "@/models/product";
import {
  uploadFile,
  getFileUrl,
  deleteFile,
  listFiles,
} from "@/services/storage";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

const storage = new Hono()
  .use(JwtMiddlware())
  .post(
    "/upload",
    zValidator(
      "form",
      z.object({
        file: z.instanceof(File),
      })
    ),
    async (c) => {
      try {
        const { id: userId } = c.get("jwtPayload");
        const { file } = await c.req.parseBody();
        const productId = c.req.query("productId");
        if (!file || !(file instanceof File)) {
          return c.json({ error: "No file provided" }, 400);
        }

        const fileBuffer = await file.arrayBuffer();
        const { url, file_id } = await uploadFile(
          Buffer.from(fileBuffer),
          file.name,
          file.type,
          userId
        );
        if (productId) {
          await Product.findByIdAndUpdate(productId, {
            $push: { images: url, files: file_id },
          });
        }
        return c.json({ message: "File uploaded successfully", url });
      } catch (error) {
        console.error("Upload error:", error);
        return c.json({ error: "File upload failed" }, 500);
      }
    }
  )
  .get("/files/:filename", async (c) => {
    const filename = c.req.param("filename");
    try {
      const url = await getFileUrl(filename);
      return c.json({ url });
    } catch (error) {
      console.error("Get file error:", error);
      return c.json({ error: "File not found" }, 404);
    }
  })
  .delete("/files/:filename", async (c) => {
    const filename = c.req.param("filename");
    try {
      await deleteFile(filename);
      return c.json({ message: "File deleted successfully" });
    } catch (error) {
      console.error("Delete file error:", error);
      return c.json({ error: "File deletion failed" }, 500);
    }
  })
  .get("/files", async (c) => {
    try {
      const files = await listFiles();
      return c.json({ files });
    } catch (error) {
      console.error("List files error:", error);
      return c.json({ error: "Failed to list files" }, 500);
    }
  });

export default storage;
