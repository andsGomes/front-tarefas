export type IInputProps = React.ComponentProps<"input"> & {
  readonly label?: string;
  readonly id: string;
};

export type IDataTarefas = {
  id: string;
  title: string;
  status: string;
  deletedAt?: Date | null;
};

export type UseFetchResult<T> = {
  data: T | null;
  loading?: boolean;
  error?: Error | null;
  success?: boolean | null;
  fetchData?: () => Promise<void>;
};

export type ICheckedProps = React.ComponentProps<"input"> & {
  id: string; 
  label: string;
  check: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  Date?: Date | null;
};

export type IBoxProps ={
  id: string;
  title: string;
  status: string;
  deletedAt: Date | null;
  className?: string;
  onCompleteTarefa?: (id: string, isChecked: boolean) => void;
  onRemoveTarafa?: (id: string) => void;
}

export type IButtonProps = React.ComponentProps<"button">;
export type IIButtonProps = React.ComponentProps<"button">;