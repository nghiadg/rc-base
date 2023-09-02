import { ColDef } from "ag-grid-community";
import { useCallback, useMemo } from "react";
import { Form, Modal } from "react-bootstrap";
import {
  AppButton,
  AppButtonIcon,
  AppCalendar,
  AppDatePicker,
  AppDialogMessage,
  AppGrid,
  AppInput,
  AppInputSearch,
  AppInputTime,
  AppModal,
  AppSelect,
  IconWrapper,
} from "../../components/common";
import {
  DialogMessage,
  DialogMessageButton,
} from "../../components/common/AppDialogMessage/AppDialogMessage.const";
import { IAppModalProps } from "../../components/common/AppModal/AppModal.types";
import { IconChecked, IconSpinner } from "../../components/icons";

interface ModalExampleProps<TData> extends IAppModalProps<TData> {
  customProp: string;
}

const ModalExample = (props: ModalExampleProps<string>) => (
  <Modal backdrop="static" centered show>
    <Modal.Header>App Modal</Modal.Header>
    <Modal.Body>Hello world</Modal.Body>
    <Modal.Footer>
      <AppButton
        onClick={() =>
          props.onClose?.({
            button: "close",
            data: "data",
          })
        }
      >
        Close
      </AppButton>
    </Modal.Footer>
  </Modal>
);

export const UiKit = () => {
  const columnDefs = useMemo(
    (): ColDef[] => [
      {
        headerName: "名前",
      },
      {
        headerName: "歳",
      },
    ],
    [],
  );

  const showDialogMessageInfo = useCallback(async () => {
    const res = await new AppDialogMessage(
      new DialogMessage(DialogMessage.Info, "Dialog message {0}"),
      "Info",
      [DialogMessageButton.mbNo, DialogMessageButton.mbClose],
    );
    console.log(res);
  }, []);

  const showDialogMessageWarning = useCallback(async () => {
    const res = await new AppDialogMessage(
      new DialogMessage(DialogMessage.Warning, "Dialog message {0}"),
      "Warning",
      [DialogMessageButton.mbNo, DialogMessageButton.mbClose],
    );
    console.log(res);
  }, []);

  const showDialogMessageError = useCallback(async () => {
    const res = await new AppDialogMessage(
      new DialogMessage(DialogMessage.Error, "Dialog message {0}"),
      "Error",
      [DialogMessageButton.mbNo, DialogMessageButton.mbClose],
    );
    console.log(res);
  }, []);

  const showDialogMessageNone = useCallback(async () => {
    const res = await new AppDialogMessage(
      new DialogMessage(DialogMessage.None, "Dialog message {0}"),
      "None",
      [DialogMessageButton.mbNo, DialogMessageButton.mbClose],
    );
    console.log(res);
  }, []);

  const openAppModal = useCallback(async () => {
    const res = await new AppModal({
      children: ModalExample,
      props: {
        customProp: "custom",
      },
    });

    console.log(res);
  }, []);

  return (
    <div className="p-3">
      <h1>UI kit</h1>
      <section>
        <h3>App Calendar</h3>
        <AppCalendar />
        <h3>App DatePicker</h3>
        <AppDatePicker minMaxYear={[null, 2024]} />
        <h3>App DatePicker hasCalendar false</h3>
        <AppDatePicker minMaxYear={[null, 2024]} hasCalendar={false} />
        <hr />
        <h3>App Input Time</h3>
        <AppInputTime width="xs" />
        <hr />
        <h3>Button</h3>
        <AppButton>Button Default</AppButton>
        <AppButton variant="transparent">Button transparent</AppButton>
        <AppButton variant="secondary">Button secondary</AppButton>
        <AppButton variant="light">Button light</AppButton>
        <h3>Button Disabled</h3>
        <AppButton disabled>Button disabled</AppButton>
        <h3>Button Size</h3>
        <AppButton size="lg">Button lg</AppButton>
        <AppButton variant="secondary">Button sm</AppButton>
        <AppButton size="xs">Button xs</AppButton>
        <h3>Button Icon</h3>
        <AppButtonIcon variant="light" icon={IconSpinner}>
          Button Icon
        </AppButtonIcon>
        <h3>Button Icon Square</h3>
        <AppButtonIcon shape="square" variant="light" icon={IconSpinner} />
        <AppButtonIcon direction="vertical" variant="light" icon={IconSpinner}>
          Button Icon
        </AppButtonIcon>
        <h3>Button Icon Only</h3>
        <AppButtonIcon iconOnly icon={IconChecked} />
      </section>
      <hr />
      <section>
        <h3>Icon</h3>
        <IconSpinner />
        <IconSpinner size={32} />
        <h3>Icon Wrapper</h3>
        <IconWrapper size="xs" as={IconSpinner} />
        <IconWrapper size="sm" as={IconSpinner} />
        <IconWrapper size="lg" as={IconSpinner} />
      </section>
      <hr />
      <section>
        <h3>Select</h3>
        <AppSelect
          options={[
            { value: 0, label: "Otp 1" },
            { value: 1, label: "Otp 2" },
          ]}
          blurInputOnSelect
        />
        <h3>Select Error</h3>
        <AppSelect
          options={[
            { value: 0, label: "Otp 1" },
            { value: 1, label: "Otp 2" },
          ]}
          blurInputOnSelect
          error
          errorMessage="Select error"
        />
        <h3>Input</h3>
        <AppInput placeholder="App Input" />
        <h3>Input Error</h3>
        <AppInput error />
        <h3>Input Error with message</h3>
        <AppInput error errorMessage="Input error" />
        <h3>Input Search</h3>
        <AppInputSearch onSearch={() => alert("Searching...")} />
        <hr />
        <h3>Checked</h3>
        <Form.Check label="Check" checked />
        <Form.Check label="Check" disabled />
        <Form.Check label="Check" checked disabled />
        <Form.Check label="Check" />
        <hr />
        <h3>Radio</h3>
        <Form.Check type="radio" label="Radio" />
        <Form.Check type="radio" label="Radio" checked />
        <Form.Check type="radio" label="Radio" disabled />
        <Form.Check type="radio" label="Radio" checked disabled />
        <hr />
        <h3>App Grid</h3>
        <div style={{ height: 200 }}>
          <AppGrid
            columnDefs={columnDefs}
            selectedFirstRowOnFirstDataRendered
          />
        </div>
      </section>
      <hr />
      <h3>AppDialogMessage</h3>
      <div className="d-flex gap-2">
        <AppButton onClick={showDialogMessageNone}>Open Dialog None</AppButton>
        <AppButton onClick={showDialogMessageInfo}>Open Dialog Info</AppButton>
        <AppButton onClick={showDialogMessageWarning}>
          Open Dialog Warning
        </AppButton>
        <AppButton onClick={showDialogMessageError}>
          Open Dialog Error
        </AppButton>
      </div>
      <h3>App Modal</h3>
      <AppButton onClick={openAppModal}>Open Modal</AppButton>
    </div>
  );
};
