import { useEffect, useState } from "react";
import agent from "../api/agent";

import useAppContext from "../store/AppContext";
import useAuthContext from "../store/AuthContext";

export const useTypingDebounce = (callback: () => void, time: number) => {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("" as any);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (debouncedSearchTerm) {
        setIsLoading(true);
        callback();
        setTimeout(() => setIsLoading(false), 1000);
      }
    }, time);

    return () => {
      clearTimeout(debounce);
      setIsLoading(false);
    };
  }, [debouncedSearchTerm]);

  return {
    debouncedSearchTerm,
    setDebouncedSearchTerm,
    isLoading,
  };
};

// Registruje klik mimo komponent předaný v ref a provede akci z parametru
export const useClickOutside = (ref: any, actionCallback: () => void) => {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        actionCallback();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
};

export const useUserCategories = () => {
  const { currentUser } = useAuthContext();
  const { setIsLoading } = useAppContext();
  const [fetchedUserCategories, setFetchedUserCategories] = useState([] as any);

  useEffect(() => {
    const controller = new AbortController();

    const fetchCategories = async () => {
      setIsLoading(true);
      const res = await agent.Categories.getAll(currentUser?.id!, {
        signal: controller.signal,
      });
      if (res?.data.isSuccess) setFetchedUserCategories(res.data.result);
      setIsLoading(false);
    };

    fetchCategories();

    return () => {
      controller.abort();
      setIsLoading(false);
    };
  }, []);

  return { fetchedUserCategories, setFetchedUserCategories };
};
