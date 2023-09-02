import { useMemo } from "react";
import { useModalState } from "./AppModal.core";
import { IAppModalImplProps } from "./AppModal.types";

export const AppModalQueue = () => {
  const modalsState = useModalState();

  const modals = useMemo(
    () => modalsState.sort((prev, next) => prev.time - next.time),
    [modalsState],
  );

  return (
    <>
      {modals.map(({ id, props }) => (
        <AppModal key={id} {...props} />
      ))}
    </>
  );
};

const AppModal = ({ children: Modal, ...props }: IAppModalImplProps) => {
  return (
    <>
      <Modal {...props} />
    </>
  );
};
