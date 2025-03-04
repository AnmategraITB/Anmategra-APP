// Props Import
import {
  type ColumnProps,
} from "../_components/laporan/board/report-column";
// Components Import
import { LaporanMainContainer } from "../_components/laporan/laporan-main-container";

const DummyData: ColumnProps[] = [
  {
    title: "Draft",
    reports: [
      { id: "1", name: "Report 1", date: "15/07/2024", category: "Kategori" },
      { id: "2", name: "Report 2", date: "15/07/2024", category: "Kategori" },
      { id: "3", name: "Report 3", date: "15/07/2024", category: "Kategori" },
    ],
  },
  {
    title: "In Progress",
    reports: [
      { id: "4", name: "Report 4", date: "15/07/2024", category: "Kategori" },
      { id: "5", name: "Report 5", date: "15/07/2024", category: "Kategori" },
    ],
  },
  {
    title: "Resolved",
    reports: [
      { id: "6", name: "Report 6", date: "15/07/2024", category: "Kategori" },
    ],
  },
];
const LaporanPage = () => {
  return <LaporanMainContainer data={DummyData}/>;
};

export default LaporanPage;