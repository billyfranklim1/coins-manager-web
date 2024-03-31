import { useState, useEffect } from "react";
import Layout from "../layout";
import CryptoTable from "./components/CryptoTable";

export default function Home() {
  // const [data, setData] = useState([]);
  // const [pagination, setPagination] = useState({ links: [] });
  // const [page, setPage] = useState(1);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const token = '6|Du81TwZXjigh4zRCGFpeaP9smTRD0FdojwoOYd0k7cbc5334';
  //       const currentPageUrl = `http://localhost/api/coins?page=${page}`;

  //       const response = await fetch(currentPageUrl, {
  //           method: "GET",
  //           headers: {
  //               "Content-Type": "application/json",
  //               Authorization: `Bearer ${token}`,
  //           },
  //           });

  //       if (!response.ok) throw new Error("Network response was not ok");
  //       const responseData = await response.json();

  //       setData(responseData.data);
  //       setPagination({
  //         links: responseData.links.map((link) => ({
  //           url: link.url,
  //           label: link.label,
  //           active: link.active,
  //         })),
  //       });
  //     } catch (error) {
  //       console.error("There was a problem with your fetch operation:", error);
  //     }
  //   };

  //   fetchData();
  // }, [page]);

  // const handleNavigate = (page) => {
  //   setPage(page);
  // };

  return (
    <Layout>
      <div className="py-6 sm:px-6 lg:px-8  h-full">
        <CryptoTable />
      </div>
    </Layout>
  );
}
