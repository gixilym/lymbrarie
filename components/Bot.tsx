// import OpenAI from "openai";
// import useLocalStorage from "@/hooks/useLocalStorage";
// import { animated, useSpring } from "@react-spring/web";
// import { APIPromise } from "openai/core.mjs";
// import { BotMessageSquare as Icon, SendIcon, XIcon } from "lucide-react";
// import { ChatCompletion } from "openai/resources/index.mjs";
// import { FormEvent, useEffect, useState } from "react";
// import { twMerge } from "tailwind-merge";
// import type { Component } from "@/utils/types";

// const openai: OpenAI = new OpenAI({
//   apiKey: process.env.OPENAI_KEY,
//   dangerouslyAllowBrowser: true,
// });

// type Message = { role: string; content: string };

// function Bot(): Component {
//   const [showChat, setShowChat] = useState<boolean>(false),
//     [msg, setMsg] = useState<string>(""),
//     [messages, setMessages] = useState<Message[]>([]),
//     [thinking, setThinking] = useState<boolean>(false),
//     [animations] = useLocalStorage("animations", true),
//     [books] = useLocalStorage("cache-books", []),
//     [styles, api] = useSpring(() => ({
//       from: { opacity: animations ? 0 : 1 },
//       to: { opacity: 1 },
//       config: { duration: 400 },
//     }));

//   useEffect(() => {
//     api.start({
//       from: { opacity: animations ? 0 : 1 },
//       to: { opacity: 1 },
//       config: { duration: 400 },
//     });
//   }, [showChat]);

//   const prompt: string = `${JSON.stringify(
//     books
//   )} - Ese array de libros son mi información base, si hago preguntas debes basarte en esa información para responderme`;

//   function onSubmit(e: FormEvent): void {
//     e.preventDefault();
//     if (!msg.trim()) return;

//     setMsg("");
//     setTimeout(() => setThinking(true), 500);
//     const userMsg: Message = { role: "user", content: msg };
//     const updatedMessages = [...messages, userMsg];
//     setMessages(updatedMessages);

//     const completion: APIPromise<ChatCompletion> =
//       // @ts-ignore
//       openai.chat.completions.create({
//         model: "gpt-4o-mini",
//         store: true,
//         messages: [{ role: "system", content: prompt }, ...updatedMessages],
//       });

//     completion
//       .then(res => {
//         const botMsg: Message = {
//           role: "assistant",
//           content: res.choices[0].message.content,
//         };
//         setMessages([...updatedMessages, botMsg]);
//       })
//       .finally(() => setThinking(false));
//   }

//   return showChat ? (
//     <animated.section
//       style={styles}
//       className="z-50 fixed right-6 bottom-6 max-w-xs h-[400px] bg-zinc-800 rounded-lg overflow-hidden flex flex-col justify-between items-center w-full border-2 border-purple-400/20"
//     >
//       <header className="px-5 py-3 bg-purple-600/30 text-lg text-slate-100 w-full flex items-center justify-between">
//         <p>LymBot</p>
//         <XIcon
//           onClick={() => setShowChat(false)}
//           size={24}
//           className="cursor-pointer"
//         />
//       </header>

//       <div
//         className="flex-1 p-3 overflow-y-auto flex flex-col space-y-2 h-full bg-transparent"
//         id="chat-display"
//       >
//         <p className="mr-6 self-end bg-zinc-700 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
//           Hola, soy LymBot! ¿En qué puedo ayudarte?
//         </p>
//         {messages.map((msg, i) => (
//           <p
//             key={i}
//             className={twMerge(
//               "chat-message",
//               msg.role === "user"
//                 ? "self-end bg-blue-500 text-white ml-6"
//                 : "self-start bg-zinc-700 text-slate-100 mr-6",
//               "max-w-xs rounded-lg px-3 py-1.5 text-sm"
//             )}
//           >
//             {msg.content}
//           </p>
//         ))}
//         {thinking && (
//           <p className="self-start bg-zinc-700 text-slate-100 max-w-xs rounded-lg px-3 py-1.5 text-sm">
//             Escribiendo...
//           </p>
//         )}
//       </div>
//       <form
//         onSubmit={onSubmit}
//         className="py-3 px-4 border-t border-zinc-700 flex items-center justify-center gap-x-3 w-full"
//       >
//         <input
//           type="text"
//           placeholder="Escribe aquí..."
//           className="input !outline-0 input-bordered w-full max-w-xs text-slate-200 placeholder:text-slate-500"
//           id="chat-input"
//           value={msg}
//           onChange={e => setMsg(e.target.value)}
//           autoFocus
//         />
//         <div className="rounded-lg cursor-pointer bg-blue-700 p-[7.2px]">
//           <SendIcon
//             id="send-btn"
//             type="submit"
//             size={26}
//             className="text-purple-200"
//           />
//         </div>
//       </form>
//     </animated.section>
//   ) : (
//     <Icon
//       onClick={() => setShowChat(true)}
//       size={50}
//       color="#ededed"
//       className="fixed right-12 bottom-20 z-50 cursor-pointer"
//     />
//   );
// }

// export default Bot;
export default function Bot() {
  return <></>;
}
