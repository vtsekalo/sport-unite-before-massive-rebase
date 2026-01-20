import { ModalWrapper } from '@entities/modal-wrapper';
import { RegistrationForm } from '@widgets/registration';

export const RegistrationPage = () => {
  return (
    <ModalWrapper
      maxWidth={{ xs: 361, md: 480 }}
      height='auto'
      maxHeight='100%'
    >
      <RegistrationForm />
    </ModalWrapper>
  );
};
