'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Heart, Loader2 } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { config } from '@/config';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib';
import { useRouter } from 'next/navigation';

interface MarketPlaceCardProps {
  id: string | number;
  mintAddress?: string;
  label: string;
  tag: string;
  price: string;
  totalLikes: number | string;
  liked: boolean;
  imageUrl: string;
  className?: string;
}

export const MarketPlaceCard: React.FC<MarketPlaceCardProps> = (props) => {
  // Router
  const router = useRouter();

  // Wallet
  const { publicKey } = useWallet();

  // React Query
  const queryClient = useQueryClient();

  // Toast
  const { toast } = useToast();

  const mutation = useMutation({
    mutationKey: ['marketplace', publicKey?.toString()],
    mutationFn: async (payload: {
      mintAddress: string;
      buyerWalletAddress: string;
      price: string;
    }) => {
      const response = await axios.post(`${config.PURCHASE}`, payload);
      return response.data;
    },
  });

  const handlePurchaseNft = async () => {
    if (!props.mintAddress) {
      router.push('/app/market');
    } else if (publicKey) {
      const payload = {
        mintAddress: String(props.mintAddress),
        buyerWalletAddress: publicKey?.toString(),
        price: props.price,
      };
      mutation.mutate(payload, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['marketplace'] });
          toast({
            title: 'Success',
            description: 'NFT purchased successfully!',
          });
        },
        onError: (error) => {
          console.error('Purchase failed', error);

          // @ts-expect-error: This will be there
          const message = error?.response?.data?.message || error.message;

          toast({
            title: 'Failed to purchase NFT. Please try again later.',
            description: message,
            variant: 'destructive',
          });
        },
      });
    } else {
      toast({
        title: 'Error',
        description: 'Please connect your wallet to purchase NFTs.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div
      key={props.mintAddress}
      className={cn('rounded-md p-4 bg-muted sm:rounded-xl', props.className)}
    >
      <div className="flex items-center justify-between mb-2">
        <Badge className="sm:px-4 capitalize">{props.tag}</Badge>
      </div>

      <Image
        src={props.imageUrl ?? ''}
        alt={props.label}
        width={238}
        height={193}
        className="object-contain max-w-[238px] max-h-[193px] overflow-hidden rounded-xl"
      />

      <div className="mt-2 flex items-center justify-between font-[600] text-xs sm:text-base">
        <h2 className="text-muted-foreground">{props.label}</h2>
        <h5>{props.price}</h5>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center space-x-1">
          <Heart
            className={cn(
              'w-4 h-4 sm:w-5 sm:h-5 cursor-pointer mr-1',
              props.liked ? 'fill-red-500 text-red-500' : ''
            )}
          />
          <p className="text-xs">{props.totalLikes}</p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant={'primary'}
              size={'sm'}
              className="text-background-1 h-6 sm:h-9"
              disabled={mutation.isPending}
            >
              Purchase
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Proceed with Purchase: {props.label}</DialogTitle>
              <DialogDescription>
                For this purchase, we will only charge Devnet SOL.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  variant={'secondary'}
                  size={'sm'}
                  className="text-primary h-6 sm:h-9"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                variant={'primary'}
                size={'sm'}
                className="text-background-1 h-6 sm:h-9"
                disabled={mutation.isPending}
                onClick={handlePurchaseNft}
              >
                {mutation.isPending && (
                  <span className="mr-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </span>
                )}
                <span>Continue</span>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default MarketPlaceCard;
