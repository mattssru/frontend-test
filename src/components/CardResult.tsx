import React from "react";
import { Heading, Text } from "rsuite";
import { Icon } from "@rsuite/icons";

interface CardResultProps {
  number: number | string;
  description: string;
  icon: React.ElementType;
}

const CardResult: React.FC<CardResultProps> = ({
  number,
  description,
  icon,
}) => {
  return (
    <div className="rounded-2xl shadow-xl p-6 bg-white">
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-violet-700 max-w-14 w-full h-14 flex items-center justify-center">
          <Icon as={icon} style={{ color: "#fff", fontSize: "29px" }} />
        </div>
        <div>
          <Heading level={4} className="!text-2xl">
            {number}
          </Heading>
          <Text className="text-lg">{description}</Text>
        </div>
      </div>
    </div>
  );
};

export default CardResult;
