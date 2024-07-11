import Link from "next/link";

const CopyrightsFooter = () => {
  return (
    <div className="w-full px-4 flex items-center justify-between lg:justify-evenly flex-row lg:flex-col bg-dark gap-3 lg:gap-0">
      <span className="text-light lg:!text-xs">
        {new Date().getFullYear()} RoomCare.Pro &copy; Tous droits réservés <br />
      </span>
    </div>
  );
};

export default CopyrightsFooter;
