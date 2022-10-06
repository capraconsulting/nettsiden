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
      <div className="text-6xl w-full h-full flex gap-2 items-center justify-center">
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
  <div className="bg-light-blue-50 bg-opacity-50 w-full h-full flex items-center justify-center text-3xl">
    {emoji}
  </div>
);
