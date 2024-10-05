'use client';

import React from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib';
import { MyCreationCard } from '../_components/my-creations/my-creation-card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { config } from '@/config';
import { useWallet } from '@solana/wallet-adapter-react';

const MyCreationsPage = () => {
  // Wallet
  const { publicKey } = useWallet();

  // Toast
  const { toast } = useToast();

  // React Query
  const { data = [], isLoading } = useQuery({
    queryKey: ['my-creations'],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `${config.RECENT}/${publicKey?.toString()}`
        );

        if (response.status === 200) {
          return response.data;
        }
        return response;
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error getting my creations: ', error);
          toast({
            title: 'Error Getting My Creations',
            description: error.message,
            variant: 'destructive',
          });
          throw error;
        }
      }
    },
  });

  return (
    <ScrollArea className="container mx-auto max-w-7xl w-full h-screen">
      <main className="p-12">
        <div className="flex items-center space-x-12">
          <Button
            size={'lg'}
            className={cn('bg-accent-1/80 hover:bg-accent-1/60 min-w-36')}
          >
            In market
          </Button>
          <Button
            variant={'outline'}
            size={'lg'}
            className={cn(
              'border-accent-1/50 hover:border-accent-1/60 hover:bg-background-1/20 min-w-36'
            )}
          >
            Draft
          </Button>
        </div>

        {isLoading ? (
          <div className="w-full h-[calc(100vh-4rem)] flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-accent-1" />
          </div>
        ) : Array.isArray(data) && data.length > 0 ? (
          <div className="mt-10 sm:grid-cols-2 grid xl:grid-cols-3 w-full gap-6 mb-16">
            {data.map((_, idx) => (
              <div key={idx}>
                <MyCreationCard
                  imageUrl="/images/dialog-nft.png"
                  label="Jade #304"
                  price="47.25 SOL"
                  nftType="Art"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-20 w-full flex items-center justify-center">
            <span className="text-center p-3 px-5 rounded-xl bg-accent-muted text-accent-1">
              You don&apos;t have NFTs in your account
            </span>
          </div>
        )}
      </main>
    </ScrollArea>
  );
};

export default MyCreationsPage;
