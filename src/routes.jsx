import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
  PhoneIcon,
  ClipboardDocumentCheckIcon,
  UsersIcon,
  CalendarIcon,
  ChartBarIcon,
  WalletIcon,
  CogIcon,
  BriefcaseIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/solid";

import {
  Home,
  Profile,
  Tables,
  Notifications,
  UploadServiceForm,
  DashboardTable,
  PatientManagement,
  AppointmentManagement,
  Analytics,
  FinancialReports,
  StaffManagement,
  InventoryManagement,
  UserRoles,
  SecuritySettings,
  Settings,
} from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import { Whome, About, Services, Contact, Appointment, Testimonials, DentalServices } from "@/pages/website";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  // Dashboard Routes
  {
    layout: "dashboard",
    pages: [
      { id: 1, icon: <HomeIcon {...icon} />, name: "Dashboard", path: "home", element: <Home /> },
      { id: 2, icon: <UserCircleIcon {...icon} />, name: "Profile", path: "profile", element: <Profile /> },
      { id: 3, icon: <UsersIcon {...icon} />, name: "Patients", path: "patients", element: <PatientManagement /> },
      { id: 4, icon: <CalendarIcon {...icon} />, name: "Appointments", path: "appointments", element: <AppointmentManagement /> },
      { id: 5, icon: <TableCellsIcon {...icon} />, name: "Tables", path: "tables", element: <Tables /> },
      { id: 6, icon: <ClipboardDocumentCheckIcon {...icon} />, name: "Clinic Services", path: "servicestable", element: <DashboardTable /> },
      { id: 7, icon: <InformationCircleIcon {...icon} />, name: "Add Services", path: "servicesform", element: <UploadServiceForm /> },
      { id: 8, icon: <BriefcaseIcon {...icon} />, name: "Staff", path: "staff", element: <StaffManagement /> },
      { id: 9, icon: <ChartBarIcon {...icon} />, name: "Analytics", path: "analytics", element: <Analytics /> },
      { id: 10, icon: <WalletIcon {...icon} />, name: "Financial Reports", path: "financial-reports", element: <FinancialReports /> },
      { id: 11, icon: <CogIcon {...icon} />, name: "Inventory", path: "inventory", element: <InventoryManagement /> },
      { id: 12, icon: <ShieldCheckIcon {...icon} />, name: "Security", path: "security", element: <SecuritySettings /> },
      { id: 13, icon: <ServerStackIcon {...icon} />, name: "User Roles", path: "user-roles", element: <UserRoles /> },
      { id: 14, icon: <InformationCircleIcon {...icon} />, name: "Notifications", path: "notifications", element: <Notifications /> },
      { id: 15, icon: <CogIcon {...icon} />, name: "Settings", path: "settings", element: <Settings /> },
    ],
  },

  // Auth Routes
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      { id: 16, icon: <ServerStackIcon {...icon} />, name: "Sign In", path: "sign-in", element: <SignIn /> },
      { id: 17, icon: <RectangleStackIcon {...icon} />, name: "Sign Up", path: "sign-up", element: <SignUp /> },
    ],
  },

  // Website Routes
  {
    layout: "website",
    pages: [
      { id: 18, icon: <HomeIcon {...icon} />, name: "Home", path: "/", element: <Whome /> },
      { id: 19, icon: <InformationCircleIcon {...icon} />, name: "About", path: "/about", element: <About /> },
      { id: 20, icon: <ClipboardDocumentCheckIcon {...icon} />, name: "Services", path: "/services", element: <Services /> },
      { id: 21, icon: <UserCircleIcon {...icon} />, name: "Testimonials", path: "/testimonials", element: <Testimonials /> },
      { id: 22, icon: <PhoneIcon {...icon} />, name: "Contact", path: "/contact", element: <Contact /> },
      { id: 23, icon: <RectangleStackIcon {...icon} />, name: "Appointment", path: "/appointment", element: <Appointment /> },
      { id: 24, icon: <RectangleStackIcon {...icon} />, name: "Our Services", path: "/our-services", element: <DentalServices /> },
    ],
  },
];

export default routes;
