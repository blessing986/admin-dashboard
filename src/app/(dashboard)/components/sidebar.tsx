"use client";

import { clearAuth } from "@/store/authSlice";
import {
  ChevronRight,
  HeadsetIcon,
  LogOut,
  ShoppingBagIcon,
  TruckIcon,
  UserCircle2Icon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";

const SideLinks = [
  {
    id: 1,
    title: "Role Management",
    path: "/role/user",
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
    path: "/product/manage-products",
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
    path: "/delivery/order",
    icon: <TruckIcon className="h-4 w-4" />,
    list: [{ id: 1, title: "Order Management", path: "/delivery/order" }],
  },
];

const Sidebar = () => {
  const dispatch = useDispatch();

  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [activeSubmenuItem, setActiveSubmenuItem] = useState<string>("");

  const toggleDropdown = (id: number, firstSubmenuPath: string) => {
    setActiveDropdown((prev) => (prev === id ? null : id));
    if (!activeSubmenuItem || activeDropdown !== id) {
      setActiveSubmenuItem(firstSubmenuPath);
    }
  };

  const handleLogout = () => {
    dispatch(clearAuth());
  };

  return (
    <>
      <div className="sticky top-10 flex h-[calc(100vh-40px)] flex-col justify-between">
        <div className="mb-10 flex items-center gap-5 pl-5 pt-5">
          <UserCircle2Icon size={46} />
          <div className="flex flex-col">
            <span className="font-medium">Blessing Ubiomor</span>
            <span className="text-xs">Administator</span>
          </div>
        </div>

        <ul>
          {SideLinks.map((item) => (
            <li
              key={item.id}
              className="mb-5 cursor-pointer text-sm font-normal text-[#C9C9C9]">
              <Link
                href={item.path}
                className={`flex items-center justify-between px-5 py-2 transition-all hover:text-[#EE3248] ${activeDropdown === item.id ? "bg-[#EE3248] bg-opacity-20 text-[#EE3248]" : "text-[#C9C9C9] hover:bg-[#EE3248] hover:bg-opacity-20"}`}
                onClick={() => toggleDropdown(item.id, item.list[0]?.path)}>
                <span className="flex gap-2">
                  {item.icon} {item.title}
                </span>
                <ChevronRight
                  className={`h-4 w-4 transition-transform ${
                    activeDropdown === item.id ? "rotate-90" : ""
                  }`}
                />
              </Link>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  activeDropdown === item.id ? "max-h-40" : "max-h-0"
                }`}>
                <div className="flex flex-col space-y-2 pl-6">
                  {item.list.map((list) => (
                    <Link
                      key={list.id}
                      href={list.path}
                      className={`block py-2 transition-all ${
                        activeSubmenuItem === list.path
                          ? "text-[#EE3248]"
                          : "hover:text-[#EE3248]"
                      }`}
                      onClick={() => setActiveSubmenuItem(list.path)}>
                      {list.title}
                    </Link>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-auto px-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center rounded-[50px] bg-[#EE3248] py-2 text-sm font-semibold text-white">
            <LogOut className="mr-6 h-4 w-4" />
            LOG OUT
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

// "use client";

// import { clearAuth } from "@/store/authSlice";
// import {
//   ChevronRight,
//   HeadsetIcon,
//   LogOut,
//   ShoppingBagIcon,
//   TruckIcon,
//   UserCircle2Icon,
// } from "lucide-react";
// import Link from "next/link";
// import { useState } from "react";
// import { useDispatch } from "react-redux";

// const SideLinks = [
//   {
//     id: 1,
//     title: "Role Management",
//     path: "/role/user",
//     icon: <HeadsetIcon className="h-4 w-4" />,
//     list: [
//       {
//         id: 1,
//         title: "User Roles",
//         path: "/role/user",
//       },
//       {
//         id: 2,
//         title: "Account Management",
//         path: "/role/account",
//       },
//       {
//         id: 3,
//         title: "Permission Management",
//         path: "/role/permission",
//       },
//       {
//         id: 4,
//         title: "Activity Logging",
//         path: "/role/activity-logging",
//       },
//     ],
//   },
//   {
//     id: 2,
//     title: "Product Management",
//     path: "/product/manage-products",
//     icon: <ShoppingBagIcon className="h-4 w-4" />,
//     list: [
//       {
//         id: 1,
//         title: "Manage Products",
//         path: "/product/manage-products",
//       },
//       {
//         id: 2,
//         title: "Product Bundle",
//         path: "/product/bundle",
//       },
//       {
//         id: 3,
//         title: "Product Optimizer",
//         path: "/product/optimizer",
//       },
//     ],
//   },
//   {
//     id: 3,
//     title: "Delivery & Order Tracking",
//     path: "/delivery/order",
//     icon: <TruckIcon className="h-4 w-4" />,
//     list: [{ id: 1, title: "Order Management", path: "/delivery/order" }],
//   },
// ];

// const Sidebar = () => {
//   const dispatch = useDispatch();
//   const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

//   const toggleDropdown = (id: number) => {
//     setActiveDropdown((prev) => (prev === id ? null : id));
//   };

//   const handleLogout = () => {
//     dispatch(clearAuth());
//   };

//   return (
//     <>
//       <div className="sticky top-10 flex h-[calc(100vh-40px)] flex-col justify-between">
//         <div className="mb-10 flex items-center gap-5 pl-5 pt-5">
//           <UserCircle2Icon size={46} />
//           <div className="flex flex-col">
//             <span className="font-medium">Blessing Ubiomor</span>
//             <span className="text-xs">Administator</span>
//           </div>
//         </div>

//         <ul>
//           {SideLinks.map((item) => (
//             <li
//               key={item.id}
//               className="mb-5 cursor-pointer text-sm font-normal text-[#C9C9C9]">
//               <Link href={item.path}
//                 className={`flex items-center justify-between px-5 py-2 transition-all hover:text-[#EE3248] ${activeDropdown === item.id ? "bg-[#EE3248] bg-opacity-20 text-[#EE3248]" : "text-[#C9C9C9] hover:bg-[#EE3248] hover:bg-opacity-20"}`}
//                 onClick={() => toggleDropdown(item.id)}>
//                 <span className="flex gap-2">
//                   {item.icon} {item.title}
//                 </span>
//                 <ChevronRight
//                   className={`h-4 w-4 transition-transform ${
//                     activeDropdown === item.id ? "rotate-90" : ""
//                   }`}
//                 />
//               </Link>

//               <div
//                 className={`overflow-hidden transition-all duration-300 ${
//                   activeDropdown === item.id ? "max-h-40" : "max-h-0"
//                 }`}>
//                 <div className="flex flex-col space-y-2 pl-6">
//                   {item.list.map((list) => (
//                     <Link
//                       key={list.id}
//                       href={list.path}
//                       className="block py-2 hover:text-[#EE3248]">
//                       {list.title}
//                     </Link>
//                   ))}
//                 </div>
//               </div>
//             </li>
//           ))}
//         </ul>

//         <div className="mt-auto px-4">
//           <button
//             onClick={handleLogout}
//             className="flex w-full items-center justify-center rounded-[50px] bg-[#EE3248] py-2 text-sm font-semibold text-white">
//             <LogOut className="mr-6 h-4 w-4" />
//             LOG OUT
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Sidebar;
