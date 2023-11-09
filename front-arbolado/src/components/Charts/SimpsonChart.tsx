import React, { FC, useMemo } from "react";
import { getSimpsonIndexValue } from "../../helpers/getSimpsonIndexValue";
import { Tree } from "../../types/Tree";
import { Neighborhood } from "../../types/Neighborhood";
import { Flex } from "@chakra-ui/react";
import { ChartData } from "chart.js";
import { Bar } from "react-chartjs-2";

interface Props {
  trees: Tree[];
  neighborhoods: Neighborhood[];
}

const SimpsonChart: FC<Props> = ({ trees, neighborhoods }) => {
  const data: ChartData<"bar", number[], string> = useMemo(() => {
    return {
      labels: neighborhoods.map((n) => n.name),
      datasets: [
        {
          data: neighborhoods.map((n) => getSimpsonIndexValue(trees, n.id)),
          label: "Índice",
          backgroundColor: "red",
        },
      ],
    };
  }, [trees]);
  return (
    <Flex justifyContent={"center"} alignItems={"center"}>
      <Bar
        options={{
          indexAxis: "y" as const,
          responsive: true,
          scales: {
            x: {
              stacked: true,
              beginAtZero: true,
              suggestedMin: 0,
              max: 1,
            },
            y: {
              stacked: true,
            },
          },
          plugins: {
            // legend: {
            //   display: false,
            //   position: "top",
            // },
            title: {
              display: true,
              text: "Distribución índice de simpson por barrio",
            },
            legend: {
              display: false,
              position: "right" as const,
            },
            tooltip: {
              callbacks: {
                // title: (xDatapoint) => {
                //   return xDatapoint.raw;
                // },
                // label: (yDatapoint: TooltipItem<"bar">) => {
                //   return `${Number(yDatapoint.raw).toFixed(2)} %`;
                // },
              },
            },
          },
        }}
        data={data}
      />
    </Flex>
  );
};

export default SimpsonChart;
