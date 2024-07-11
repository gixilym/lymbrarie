export { default } from "next-auth/middleware";

export const config: { matcher: string[] } = { matcher: ["/logout", "/error"] };
