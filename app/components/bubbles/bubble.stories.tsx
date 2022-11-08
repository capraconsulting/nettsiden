import type { Story } from "@ladle/react";

import { BubbleGrid } from "./bubble-grid";
import { BubbleSandwich } from "./bubble-sandwich";

export const GenericBubleSandwich: Story = (props) => {
  const emojis = "⚡️ 📓 🔠 ☁️ 👪 🚜 💓 🔡 👢 🔝 👻 Ⓜ️ 🔽 📐 📁 🚽 💓 👠 💽 🍨";
  return (
    <BubbleSandwich
      {...props}
      items={emojis.split(" ").map((x) => (
        <EmojiBubble key={x} emoji={x} />
      ))}
    >
      <div className="flex h-full w-full items-center justify-center gap-2 text-6xl">
        👋
      </div>
    </BubbleSandwich>
  );
};
GenericBubleSandwich.argTypes = {
  bubbleEffect: {
    options: ["shift", "shuffle", "none"],
    control: { type: "radio" },
    defaultValue: "shift",
  },
};

export const GenericBubbleGrid: Story = (props) => {
  const emojis =
    "💁 🤗 🌐 ◽️ 😰 🚢 📺 🎃 🏁 🍹 😮 👞 🐐 🚐 🗯 🈹 🎡 🚣 🙌 🌽 🖋 🐭 🍊 😗 ☎️ 🎼 ⚱ 🐷 ⏰ 🕧 🏃 😦 💘 🌓 ◀️ 🛣 🔃 🚶 🖼 🐟 🏊 🈺 ✔️ ⚫️ 🏑 😶 🏞 🕷 🐰 🍒 😢 👠 ⏺ 📩 ⬅️ 🕵 🍭 😹 🕗 🏠 🆘 📛 ☢ 🍔 🎦 🍽 ⭕️ ♍️ ⏮ 🐜 🎯 🔦 👨 🌌 🕟 〽️ 🚙 🔌 🗑 👢 📂 ✊ ⛷ 🎸 🌄 🐎 0️⃣ 🔅 😨 💕 😯 🔗 ↔️ 2️⃣ 📓 🌠 🚌 🏝 🤖 🎄 ▫️ 🌶 🐪 🔚 🏧 🉑 🍴 ⛅️ 👀 🖱 👙 🛋 👵 😍 🛐 😼 🍀 🐒 🚨 🐅 🍕 👛 🈲 🎤 💣 🚜 🏵 🍶 💱 👴 📬 🐌 🕕 🚽 👏 🔝 🏈 🍲 ↖️ ♋️";
  return (
    <BubbleGrid
      {...props}
      items={emojis.split(" ").map((x) => (
        <EmojiBubble key={x} emoji={x} />
      ))}
    />
  );
};
GenericBubbleGrid.argTypes = {
  bubbleEffect: {
    options: ["shift", "shuffle", "none"],
    control: { type: "radio" },
    defaultValue: "shuffle",
  },
};

const EmojiBubble = ({ emoji }: { emoji: string }) => (
  <div className="flex h-full w-full items-center justify-center bg-light-blue-50 bg-opacity-50 text-3xl">
    {emoji}
  </div>
);
