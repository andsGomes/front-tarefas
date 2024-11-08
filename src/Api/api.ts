import useFetch from "../Hook";

export const useGet = <T>(
  url: string
): { data: T | null; loading: boolean; error: string | null } => {
  const { data, loading, error } = useFetch<T>(url);
  return { data, loading, error };
};

export const useDelete = <T>(
  baseUrl: string
): {
  loading: boolean;
  error: string | null;
  deleteData: (id: string) => Promise<T | null>;
} => {
  const { loading, error: fetchError } = useFetch<T>(""); // Aqui fornecemos uma string vazia como o URL, pois será substituída posteriormente

  const deleteData = async (id: string): Promise<T | null> => {
    try {
      const url = `${baseUrl}/${id}`;
      const response = await fetch(url, { method: "DELETE" });
      if (!response.ok) throw new Error(`Error : ${response.status}`);

      const data = await response.json();
      return data;
    } catch (error) {
      return null;
    }
  };

  return { loading, error: fetchError, deleteData };
};


export const useDeleteId = <T>(
  baseUrl: string
): {
  loading: boolean;
  error: string | null;
  deleteDataId: (id: string) => Promise<T | null>;
} => {
  const { loading, error: fetchError } = useFetch<T>(""); // Aqui fornecemos uma string vazia como o URL, pois será substituída posteriormente

  const deleteDataId = async (id: string): Promise<T | null> => {
    try {
      const url = `${baseUrl}/${id}`;
      const response = await fetch(url, { method: "DELETE" });
      if (!response.ok) throw new Error(`Error : ${response.status}`);

      const data = await response.json();
      return data;
    } catch (error) {
      return null;
    }
  };

  return { loading, error: fetchError, deleteDataId };
};

export const usePutId = <T>(
  baseUrl: string
): {
  loading: boolean;
  error: string | null;
  updateData: (id: string) => Promise<T | null>;
} => {
  const { loading, error: fetchError } = useFetch<T>(""); // Aqui fornecemos uma string vazia como o URL, pois será substituída posteriormente

  const updateData = async (id: string): Promise<T | null> => {
    try {
      const url = `${baseUrl}/${id}`;
      const response = await fetch(url, { method: "PUT" });
      if (!response.ok) throw new Error(`Error : ${response.status}`);

      const data = await response.json();
      return data;
    } catch (error) {
      return null;
    }
  };

  return { loading, error: fetchError, updateData };
};


export const useGetAll = <T>(baseUrl: string): {
  loading: boolean;
  error: string | null;
  getData: () => Promise<T[] | null>; // Alterado para retornar uma matriz
} => {
  const { loading, error: fetchError } = useFetch<T>("");

  const getData = async (): Promise<T[] | null> => { // Alterado para retornar uma matriz
    try {
      const url = `${baseUrl}`;
      const response = await fetch(url, { method: "GET" });
      if (!response.ok) throw new Error(`Error : ${response.status}`);

      const data = await response.json();
      return Array.isArray(data) ? data : [data]; // Retorna uma matriz, mesmo que tenha apenas um elemento

    } catch (error) {
      return null;
    }
  };

  return { loading, error: fetchError, getData };
};




export const usePost = <T>(
  baseUrl: string
): {
  loading: boolean;
  error: string | null;
  createData: (body: null | undefined | JSON) => Promise<T | null>; // Ajuste para receber o corpo da requisição
} => {
  const { loading, error: fetchError } = useFetch<T>("");

  const createData = async (body: null | undefined | JSON): Promise<T | null> => { // Recebe o corpo da requisição
    try {
      const response = await fetch(baseUrl, {
        method: "POST", // Alterado para POST
        headers: {
          "Content-Type": "application/json", // Se o corpo for JSON, defina o cabeçalho Content-Type adequadamente
        },
        body: JSON.stringify(body), // Passa o corpo da requisição como string JSON
      });
      if (!response.ok) throw new Error(`Error : ${response.status}`);

      const data = await response.json();
      return data;
    } catch (error) {
      return null;
    }
  };

  return { loading, error: fetchError, createData };
};