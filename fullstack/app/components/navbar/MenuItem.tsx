import Link from "next/link";
import { IconType } from "react-icons";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

interface MenuItemProps {
  label: string;
  onClick?: () => void;
  icon?: IconType;
  href?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
  label,
  onClick,
  icon: Icon,
  href,
}) => {
  return (
    <>
      {href ? (
        <Link
          onClick={onClick}
          href={href}
          className="flex flex-row gap-3 items-center p-3 outline-none hover:bg-neutral-100 hover:text-indigo-500 text-neutral-600 transition text-base rounded"
        >
          {Icon ? <Icon /> : <MdOutlineAdminPanelSettings />}
          <div>{label}</div>
        </Link>
      ) : (
        <div
          onClick={onClick}
          className="flex flex-row gap-3 items-center p-3 cursor-pointer hover:bg-neutral-100 hover:text-indigo-500 text-neutral-600 transition text-base rounded"
        >
          {Icon ? <Icon /> : <MdOutlineAdminPanelSettings />}
          <div>{label}</div>
        </div>
      )}
    </>
  );
};
export default MenuItem;
