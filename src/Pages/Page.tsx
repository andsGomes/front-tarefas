// Page.tsx
import React, { JSXElementConstructor } from "react";
import Header from "../Components/Header";
import Input from "../Components/Input";
import NotFound from "../Components/NotFound";

import Button from "../Components/Button";
import Box from "../Components/Box";

import styles from "./Page.module.css";
import { IDataTarefas } from "../Models";
import {
  useDelete,
  useDeleteId,
  useGet,
  useGetAll,
  usePost,
  usePutId,
} from "../Api";
import Loading from "../Components/Loading";

export const Page = () => {
  const [countTarefas, setCountTarefas] = React.useState(0);
  const [countTarefasConcluidas, setCountTarefasConcluidas] =
React.useState<number>(0);
  const [tarefa, setTarefas] = React.useState("");
  const [dta, setDta] = React.useState<IDataTarefas[]>([]);
  const [isVisible, setIsVisible] = React.useState(true);

  const { data, loading, error } = useGet<IDataTarefas[]>(
    "https://localhost:7098/api/Tarefas/v1/all"
  );

  const {
    loading: getIdLoading,
    error: getIdError,
    getData,
  } = useGetAll<IDataTarefas>("https://localhost:7098/api/Tarefas/v1/all");

  const {
    loading: deleteLoading,
    error: deleteError,
    deleteData,
  } = useDelete<IDataTarefas>("https://localhost:7098/api/Tarefas/v1/delete");

  const { deleteDataId } = useDeleteId<IDataTarefas>(
    "https://localhost:7098/api/Tarefas/v1/remove"
  );

  const {
    loading: updateLoading,
    error: updateError,
    updateData,
  } = usePutId<IDataTarefas>("https://localhost:7098/api/Tarefas/v1/update");

  const {
    loading: postLoading,
    error: postError,
    createData,
  } = usePost<IDataTarefas>("https://localhost:7098/api/Tarefas/v1");

  React.useEffect(() => {
    if (data) {
      setDta(data);
      setCountTarefas(data.length);
      setCountTarefasConcluidas(handleContarCompleteTarefa(data));
    }
  }, [data]);

  async function handleCriarNovaTarefa(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const requestBody = handleCreatarefas(tarefa);
    console.log(requestBody);

    if (requestBody) await createData(requestBody);

    const timeoutId = setTimeout(() => {
      handleAtualizaDados(timeoutId);
    }, 100);

    setTarefas("");
  }

  function handleCreatarefas(tf: string) {
    const newTarefas = {
      title: tf,
      status: "P",
      deletedAt: null,
    };
    return newTarefas;
  }

  function handleContarCompleteTarefa(d: IDataTarefas[]): number {
    const completedTasks = d.filter((ts) => ts.deletedAt !== null);
    return completedTasks.length;
  }

  async function handleCompletarTarefa(id: string, isChecked: boolean) {
    if (isChecked) {
      await deleteData(id);
    } else {
      await updateData(id);
    }

    const newData = await getData();
    if (newData !== null) {
      setDta(newData);
      setCountTarefasConcluidas(handleContarCompleteTarefa(newData));
    } else {
      setDta([]);
    }
  }

  async function handleRemoveTask(id: string) {
    await deleteDataId(id);
    handleDisappear;
    const timeoutId = setTimeout(() => {
      handleAtualizaDados(timeoutId);
    }, 200);
  }

  function handleDisappear() {
    setIsVisible(false);
  }

  async function handleAtualizaDados(set: number) {
    const newData = await getData();
    if (newData !== null) {
      setDta(newData);
      setCountTarefas(newData.length);
      setCountTarefasConcluidas(handleContarCompleteTarefa(newData));
    } else {
      setDta([]);
    }
    clearTimeout(set);
  }

  return (
    <>
      <Header />
      <div className="container">
        <form className={styles.contentInput} onSubmit={handleCriarNovaTarefa}>
          <Input
            id={"id"}
            value={tarefa}
            autoComplete="off"
            onChange={({ currentTarget }) => setTarefas(currentTarget.value)}
          />
          <Button disabled={tarefa.length === 0}>Criar</Button>
        </form>

        <div className={styles.tarefasContent}>
          <div className={styles.tarefas}>
            <p>
              Tarefas Criadas <span>{countTarefas}</span>
            </p>
            <p>
              Concluidas <span>{countTarefasConcluidas}</span>
            </p>
          </div>
        </div>

        {loading ? (
          <Loading />
        ) : dta.length === 0 ? (
          <div className={`${styles.not} not-found`}>
            <NotFound />
          </div>
        ) : (
          <div className={`${styles.boxs}`}>
            {dta &&
              dta.map((t) => (
                <Box
                  key={t.id}
                  id={t.id}
                  title={t.title}
                  status={t.status}
                  deletedAt={t.deletedAt !== undefined ? t.deletedAt : null}
                  onCompleteTarefa={handleCompletarTarefa}
                  onRemoveTarafa={handleRemoveTask}
                  className={isVisible ? "" : "fadeOut"}
                />
              ))}
          </div>
        )}
      </div>
    </>
  );
};
