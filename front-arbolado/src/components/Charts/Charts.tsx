import React, { useCallback, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Button, Flex, SimpleGrid } from "@chakra-ui/react";
import { useData } from "../../context/dataContext";
import TreeSpinner from "../TreeSpinner/TreeSpinner";
import SpeciesChart from "./SpeciesChart";
import DAPChart from "./DAPChart";
import RiskChart from "./RiskChart";
import SimpsonChart from "./SimpsonChart";
import { useReactToPrint } from "react-to-print";
import { useAuth } from "../../context/authContext";
import { getCurrentFormattedDate } from "../../helpers/getFormattedDate";
import ReportSummary from "../ReportSummary/ReportSummary";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Charts = () => {
  const { isLoadingTreesData, neighborhoods, trees } = useData();
  const { userCity } = useAuth();
  const componentRef = useRef<HTMLDivElement>(null);

  const reactToPrintContent = useCallback(
    () => componentRef.current,
    [componentRef.current]
  );

  const handlePrint = useReactToPrint({
    content: reactToPrintContent,
    copyStyles: false,
    documentTitle: `Reporte ${userCity?.name} ${getCurrentFormattedDate()}`,
    pageStyle: `
    @page { size: A4 portrait;  margin: 0mm; } 
    @media print { 
      .PrintSection {
        display: flex;
        align-items: center;
        flex-direction:column;
        gap:25px;
        
      }


      body { 
        -webkit-print-color-adjust: exact;  
      } 
    }
   
    `,
  });

  if (isLoadingTreesData) {
    return (
      <Flex flex="1" justifyContent={"center"} alignItems={"center"}>
        <TreeSpinner />
      </Flex>
    );
  }

  // https://chat.openai.com/share/b7cb9835-5a75-420c-b43f-a572fcc74c5a

  return (
    <Flex
      flex="1"
      gap={4}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      p="6"
    >
      <SimpleGrid
        w="100%"
        columns={2}
        spacing={10}
        ref={componentRef}
        className="PrintSection"
      >
        <ReportSummary name={userCity?.name} trees={trees} />
        <SpeciesChart trees={trees} />
        <DAPChart trees={trees} />
        <RiskChart neighborhoods={neighborhoods} trees={trees} />
        <SimpsonChart neighborhoods={neighborhoods} trees={trees} />
        {/* <BarChart neighborhoods={neighborhoods} /> */}
        {/* tabla que diga arboles faltantes por barrio */}
        {/* ver de hacer un grafico sobre el 'indice de esbeltez' altura/dap */}
      </SimpleGrid>
      <Button onClick={handlePrint} size="sm">
        Imprimir reporte
      </Button>
    </Flex>
  );
};

export default Charts;
