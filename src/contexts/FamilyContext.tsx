import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Family } from '@/types/family';
import { familyService } from '@/services/family';
import { useAuth } from './AuthContext';

interface FamilyContextType {
  currentFamily: Family | null;
  userFamilies: Family[];
  setCurrentFamily: (family: Family) => void;
  isLoading: boolean;
  error: Error | null;
}

const FamilyContext = createContext<FamilyContextType | undefined>(undefined);

export function FamilyProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [currentFamily, setCurrentFamily] = useState<Family | null>(null);

  const {
    data: userFamilies = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['userFamilies', user?.id],
    queryFn: () => (user ? familyService.getUserFamilies(user.id) : Promise.resolve([])),
    enabled: !!user,
  });

  useEffect(() => {
    if (userFamilies.length > 0 && !currentFamily) {
      setCurrentFamily(userFamilies[0]);
    }
  }, [userFamilies, currentFamily]);

  return (
    <FamilyContext.Provider
      value={{
        currentFamily,
        userFamilies,
        setCurrentFamily,
        isLoading,
        error: error as Error | null,
      }}
    >
      {children}
    </FamilyContext.Provider>
  );
}

export function useFamily() {
  const context = useContext(FamilyContext);
  if (context === undefined) {
    throw new Error('useFamily must be used within a FamilyProvider');
  }
  return context;
}
