import React from "react";
import { AppButton, AppButtonIcon, IconWrapper } from "../../components/common";
import { IconChecked, IconSpinner } from "../../components/icons";

export const UiKit = () => {
  return (
    <div className="p-3">
      <h1>UI kit</h1>
      <section>
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
        <AppButtonIcon
          shape="square"
          variant="light"
          icon={IconSpinner}
        />
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
    </div>
  );
};
