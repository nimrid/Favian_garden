'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn, convertImageUrlToFileObject } from '@/lib';
import { ChevronLeft } from 'lucide-react';
import { PageTitle } from '../page-title';
import { useWallet } from '@solana/wallet-adapter-react';
import { config } from '@/config';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string(),
  attributes: z.string().min(2).max(50),
  price: z.string().min(1),
  url: z.string().url().optional(),
  perks: z.string().optional(),
});

interface IMintFormProps {
  imageUrl: string;
  onClick?: () => void;
  onClose?: () => void;
}

const MintForm: React.FC<IMintFormProps> = ({
  imageUrl,
  onClick = () => {},
  onClose = () => {},
}) => {
  const { publicKey } = useWallet();

  const [step, setStep] = React.useState(1);

  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      attributes: '',
      price: '',
      url: '',
      perks: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const formData = new FormData();

      // Converting the Image Url to a File
      const imageFile =
        (await convertImageUrlToFileObject(imageUrl)) || imageUrl;

      formData.append('name', values.name);
      formData.append('description', values.description);
      formData.append('attributes', JSON.stringify(values.attributes));
      formData.append('image', imageFile);
      formData.append('price', values.price);
      formData.append('royaltyFee', values.perks ?? '3'); // TODO: (@vikram-2101) Is This really a thing?
      formData.append('walletAddress', publicKey?.toString() ?? 'null');

      const response = await fetch(config.MINT, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        toast({
          title: 'Error Minting NFT',
          description: 'Failed to mint NFT',
          variant: 'destructive',
        });
        throw new Error('Failed to mint NFT');
      }

      // Maybe redirect to the My Creations Page
      toast({
        title: 'NFT Minted Successfully',
        description: 'Your NFT has been minted!',
      });
      onClose?.();
    } catch (error) {
      console.error('Error minting NFT:', error);
      // @ts-expect-error: This will work
      if (error && error?.response) {
        toast({
          title: 'Error Minting NFT',
          // @ts-expect-error: This will work
          description: `Failed to mint NFT: ${error?.response?.data?.message}`,
          variant: 'destructive',
        });
      } else if (error instanceof Error) {
        toast({
          title: 'Error Minting NFT',
          description: error.message,
          variant: 'destructive',
        });
      }
    }
  };

  return (
    <div>
      <div className="flex items-center space-x-5">
        <Button
          variant={'secondary'}
          size={'sm'}
          className={cn('w-8 h-8 p-1')}
          onClick={
            step === 1
              ? onClick
              : () => {
                  setStep(1);
                }
          }
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        <PageTitle
          label={step === 1 ? 'Quick Mint' : 'Set up listing price'}
          as="h4"
        />
      </div>

      <div className="mt-3">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            {step === 1 && (
              <>
                {/* Step 1 fields */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Input Name"
                          className="bg-muted-1 border-muted-foreground text-muted-foreground"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Give your NFT a description"
                          className="bg-muted-1 border-muted-foreground text-muted-foreground resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="attributes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Attributes</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Attributes"
                          className="bg-muted-1 border-muted-foreground text-muted-foreground resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  className={cn('w-full bg-accent-1 hover:bg-accent-1/80')}
                  onClick={(e) => {
                    e.stopPropagation();
                    setStep(2);
                  }}
                >
                  Next
                </Button>
              </>
            )}

            {step === 2 && (
              <>
                {/* Step 2 fields */}
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Set up price in SOL"
                          className="bg-muted-1 border-muted-foreground text-muted-foreground"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://www.example.com/nft"
                          className="bg-muted-1 border-muted-foreground text-muted-foreground"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="perks"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Perks (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Offer your NFT holders some benefits"
                          className="bg-muted-1 border-muted-foreground text-muted-foreground resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Note: Gas fees and market fees will be deducted from
                        your wallet to continue
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className={cn('w-full bg-accent-1 hover:bg-accent-1/80')}
                >
                  Submit
                </Button>
              </>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default MintForm;
