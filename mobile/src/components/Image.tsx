import React, { forwardRef } from "react";

interface ExtendedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    customProp?: string; // Add any custom props you'd like to extend
}

const Image = forwardRef<HTMLImageElement, ExtendedImageProps>(
    ({ customProp, className, ...props }, ref) => {
        // Add custom logic using customProp or other props if needed
        console.log("Custom Prop:", customProp);

        return (
            <img
                ref={ref}
                className={`extended-image-class ${className || ""}`}
                {...props} // Pass down all standard img attributes
            />
        );
    }
);

export default Image;
