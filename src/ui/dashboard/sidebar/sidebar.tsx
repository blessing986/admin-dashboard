import {
  HeadsetIcon,
  ShoppingBagIcon,
  TruckIcon,
  UserCircle2Icon,
} from "lucide-react";
import Link from "next/link";

const SideLinks = [
  {
    id: 1,
    title: "Role Management",
    icon: <HeadsetIcon className="h-4 w-4" />,
    list: [
      {
        id: 1,
        title: "User Roles",
        path: "/role/user",
      },
      {
        id: 2,
        title: "Account Management",
        path: "/role/account",
      },
      {
        id: 3,
        title: "Permission Management",
        path: "/role/permission",
      },
      {
        id: 4,
        title: "Activity Logging",
        path: "/role/activity-logging",
      },
    ],
  },
  {
    id: 2,
    title: "Product Management",
    icon: <ShoppingBagIcon className="h-4 w-4" />,
    list: [
      {
        id: 1,
        title: "Manage Products",
        path: "/product/manage-products",
      },
      {
        id: 2,
        title: "Product Bundle",
        path: "/product/bundle",
      },
      {
        id: 3,
        title: "Product Optimizer",
        path: "/product/optimizer",
      },
    ],
  },
  {
    id: 3,
    title: "Delivery & Order Tracking",
    icon: <TruckIcon className="h-4 w-4" />,
    list: [{ id: 1, title: "Order Management", path: "/delivery/order" }],
  },
];

const Sidebar = () => {
  return (
    <>
      <div className="sticky top-10">
        <div className="mb-10 flex items-center gap-5">
          <UserCircle2Icon size={46} />
          <div className="flex flex-col">
            <span className="font-medium pl-10">Blessing Ubiomor</span>
            <span className="text-xs">Administator</span>
          </div>
        </div>

        <ul>
          {SideLinks.map((item) => (
            <li key={item.id} className="mb-10 flex flex-col gap-3 text-sm">
              <span className="flex gap-2">
                {item.icon} {item.title}
              </span>
              {item.list.map((list) => (
                <Link key={list.id} href={list.path} className="pl-10">
                  {list.title}
                </Link>
              ))}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
