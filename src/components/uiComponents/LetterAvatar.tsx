export type LetterAvatarType = {
  name: string;
  size?: string;
};
const LARGE = "LARGE";

export default function LetterAvatar(props: LetterAvatarType) {
  const { name, size = "LARGE" } = props;
  const initials = name?.charAt(0).toUpperCase();
  const iconStyle =
    size === LARGE
      ? `h-10 w-10 text-2xl font-bold`
      : `h-5 w-5 text-md font-semibold`;
  return (
    <div
      className={`flex bg-yellow-500 text-white  ${iconStyle} rounded-full justify-center items-center`}
    >
      {initials}
    </div>
  );
}
