import { Link } from "@tanstack/react-router";

import React from 'react';

interface TheLinkProps extends React.AnchorHTMLAttributes<{}> {
    to: string;
    children: React.ReactNode;
}

export default function TheLink({ to, children, ...props }: TheLinkProps):
    React.ReactElement<HTMLAnchorElement> {
    return <Link to={to} {...props}>{children}</Link>;
}
