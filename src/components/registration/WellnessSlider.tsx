import { AnyFieldApi } from "@tanstack/react-form";
import { BsEmojiFrownFill } from "react-icons/bs";
import { BsEmojiTearFill } from "react-icons/bs";
import { BsEmojiExpressionlessFill } from "react-icons/bs";
import { BsEmojiSmileFill } from "react-icons/bs";
import { BsEmojiSunglassesFill } from "react-icons/bs";
const emotionsSlide = [
  {
    id: 1,
    icon: BsEmojiFrownFill,
    className: "text-5xl p-2 border border-gray-300",
    textColor: " text-red-400 ",
  },
  {
    id: 2,
    icon: BsEmojiTearFill,
    className: " text-5xl p-2 border border-gray-300",
    textColor: "text-rose-400",
  },

  {
    id: 3,
    icon: BsEmojiExpressionlessFill,
    className: "text-5xl p-2 border border-gray-300",
    textColor: "text-orange-300 ",
  },
  {
    id: 4,
    icon: BsEmojiSmileFill,
    className: " text-5xl p-2 border border-gray-300",
    textColor: "text-yellow-400",
  },
  {
    id: 5,
    icon: BsEmojiSunglassesFill,
    className: " text-5xl p-2 border border-gray-300",
    textColor: "text-lime-400",
  },
];
export default function WellnessSlider(props) {
  const { field } = props;
  return emotionsSlide.map((emotion, i) => {
    return (
      <div key={i}>
        <emotion.icon
          className={`cursor-pointer hover:text-sky-200  ${emotion.className} ${field.state.value / 2 === emotion.id ? "bg-sky-500 text-sky-300" : emotion.textColor}`}
          onClick={() => field.handleChange(emotion.id * 2)}
        />{" "}
      </div>
    );
  });
}
