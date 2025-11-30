import React from "react";
import { formattedPrice } from "../../../../utils/trainSelectionUtils";

// GroupText Component
const GroupText = ({ className, name, amount }) => {
  return (
    <div className={`${className}_group-text`}>
      <span className={`${className}_name`}>{name}</span>
      <span className={`${className} text-center`}>{amount}</span>
    </div>
  );
};

// GroupPrice Component
const GroupPrice = ({ className, price }) => {
  return (
    <div className={`${className}_price`}>
      <span className={`${className}_min-price`}>
        {formattedPrice(price)}
        <i
          className="fa fa-rub card-trains-menu-item-bottom-icon currency-icon"
          aria-hidden="true"
        ></i>
      </span>
    </div>
  );
};

// ContentBlockItem Component
const ContentBlockItem = ({ className, children }) => {
  return <div className={`${className}-item`}>{children}</div>;
};

// ContentBlock Component
const ContentBlock = ({ className, template }) => {
  if (!template?.seats?.length) {
    return null;
  }

  return (
    <div className={`${className}_block`}>
      {template.seats.map((item) => (
        <ContentBlockItem key={item.id || item.name} className={className}>
          <GroupText
            className={className}
            name={item.name}
            amount={template.amount}
          />
          <GroupPrice
            className={className}
            price={item.price}
          />
        </ContentBlockItem>
      ))}
    </div>
  );
};

// Экспорт всех компонентов
export {
  GroupText,
  GroupPrice,
  ContentBlockItem,
  ContentBlock
};

export default {
  GroupText,
  GroupPrice,
  ContentBlockItem,
  ContentBlock
};