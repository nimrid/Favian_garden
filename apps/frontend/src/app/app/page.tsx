'use client';

import axios from 'axios';
import {
  Download,
  Loader2,
  Plus,
  PlusIcon,
  RotateCw,
  WandSparkles,
  X,
} from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

import { cn } from '@/lib';
import {
  bulbLightningIcon,
  landscapeIcon,
  mintIcon,
  portraitIcon,
  squareIcon,
} from './_components/generate-page';
import ImageContainer from './_components/image-container';
import { PageTitle } from './_components/page-title';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { config } from '@/config';
import { typeOfNFTs } from '@/constant';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import MintForm from './_components/generate-page/mint-form';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useWallet } from '@solana/wallet-adapter-react';
const buttonLabels = [
  'Anime',
  '3D art',
  'Dream',
  'Pencil Sketch',
  'Grafitti',
  'Pixel art',
  'Illustration',
  'Pop art',
  'Collages',
];

interface IInitialFromData {
  text: string;
  type: string;
  style: string;
  canvas: string;
  customSize?: string; // i.e. `888x353` (height x width)
}

interface IICustomCanvas {
  height: string;
  width: string;
}

const initialFormData: IInitialFromData = {
  text: '',
  type: '',
  style: '',
  canvas: '',
};

const initialCustomCanvas: IICustomCanvas = {
  height: '',
  width: '',
};

export default function HomePage() {
  // Loadings
  const [loading, setLoading] = React.useState(false);
  const [isDownloading, setIsDownloading] = React.useState(false);

  const [formData, setFormData] = React.useState<IInitialFromData>({
    ...initialFormData,
  });
  const [customCanvas, setCustomCanvas] = React.useState({
    ...initialCustomCanvas,
  });
  const [mintBtnClicked, setMintBtnClicked] = React.useState(false);
  const [generatedImage, setGeneratedImage] = React.useState<string | null>(
    null
  );
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const { publicKey } = useWallet();

  // Toast
  const { toast } = useToast();

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      text: value,
    }));
  };

  const handleCustomCanvasSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomCanvas((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenerateImage = async () => {
    setLoading(true);
    try {
      const payload: IInitialFromData = {
        text: formData.text,
        style: formData.style,
        type: formData.type,
        canvas: formData.canvas,
      };

      if (formData.canvas === 'Custom') {
        payload.customSize = `${customCanvas.height}x${customCanvas.width}`;
      }

      if (!payload.text) {
        toast({
          title: '⚠⚠⚠⚠⚠⚠ Error ⚠⚠⚠⚠⚠⚠',
          description: 'Please enter a text to generate an image.',
          variant: 'destructive',
        });
        return;
      }
      if (!payload.style) {
        toast({
          title: '⚠⚠⚠⚠⚠⚠ Error ⚠⚠⚠⚠⚠⚠',
          description: 'Please select a style to generate an image.',
          variant: 'destructive',
        });
        return;
      }
      if (!payload.canvas && !customCanvas.height && !customCanvas.width) {
        toast({
          title: '⚠⚠⚠⚠⚠⚠ Error ⚠⚠⚠⚠⚠⚠',
          description: 'Please select a canvas to generate an image.',
          variant: 'destructive',
        });
        return;
      }
      if (!payload.type) {
        toast({
          title: '⚠⚠⚠⚠⚠⚠ Error ⚠⚠⚠⚠⚠⚠',
          description: 'Please select a type of NFT to generate an image.',
          variant: 'destructive',
        });
        return;
      }

      const response = await axios.post(`${config.GENERATE_IMAGE}`, payload, {
        responseType: 'arraybuffer',
      });

      if (response.status === 200) {
        const imageBlob = new Blob([response.data], { type: 'image/png' });
        const imageUrl = URL.createObjectURL(imageBlob);
        setGeneratedImage(imageUrl);
        setIsOpen(true);
      }
    } catch (error) {
      console.error('Error generating image:', error);
      if (error instanceof Error) {
        toast({
          title: 'Error Generating Image',
          description: error.message,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadImage = async (imageUrl: string) => {
    setIsDownloading(true);
    try {
      const response = await fetch(imageUrl, {
        method: 'GET',
        headers: { 'Cache-Control': 'no-cache' },
      });

      if (!response.ok) {
        toast({
          title: 'Error downloading image',
          description: response.statusText,
          variant: 'destructive',
        });
        return;
      }

      const blob = await response.blob();
      const downloadUrl = window?.URL?.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      const fileName = imageUrl.split('/').pop() || 'downloaded_image';
      link.download = fileName;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window?.URL?.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Error downloading image:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={() => setIsOpen((prev) => !prev)}>
        <DialogContent className="bg-muted-1 border-green-500/50 min-w-[90%] lg:min-w-[70%] xl:min-w-[50%] max-h-[95%] overflow-y-auto">
          <DialogHeader>
            <div className="flex flex-col lg:flex-row space-x-5 items-center">
              <Image
                src={generatedImage ?? '/images/dialog-nft.png'}
                alt="NFT Dialog Image"
                width={280}
                height={312}
                className="object-contain rounded-xl p-2 h-96 w-96"
              />

              {mintBtnClicked ? (
                <div className="w-full h-full">
                  <MintForm
                    imageUrl={generatedImage ?? ''}
                    onClick={() => {
                      setMintBtnClicked((prev) => !prev);
                    }}
                    onClose={() => setIsOpen((prev) => !prev)}
                  />
                </div>
              ) : (
                <div className="w-full h-full mt-4 lg:mt-0 flex flex-col justify-between">
                  <div>
                    <DialogTitle className="mb-6">NFT World</DialogTitle>
                    <DialogDescription>
                      <h2 className="text-base lg:text-lg mb-3">Caption</h2>
                      <p>{formData.text}</p>
                    </DialogDescription>
                    <DialogFooter className="mt-3">
                      <Button
                        variant={'link'}
                        className="text-blue-500"
                        onClick={handleGenerateImage}
                      >
                        Generate another response
                      </Button>
                    </DialogFooter>
                  </div>

                  <div className="flex items-center w-full mt-6 gap-4 h-fit justify-between lg:mt-auto self-end">
                    <Button
                      variant={'outline'}
                      className={cn('min-w-28 lg:min-w-40 border-green-300')}
                      onClick={(e) => {
                        e.stopPropagation();

                        if (generatedImage) {
                          handleDownloadImage(generatedImage);
                        } else {
                          toast({
                            title: 'Error downloading image',
                            description:
                              'An error occurred while trying to download the image.',
                          });
                        }
                      }}
                    >
                      {isDownloading ? (
                        <Loader2 className="w-4 h-4 mr-2" />
                      ) : (
                        <Download className="w-4 h-4 mr-2" />
                      )}
                      <span>Download</span>
                    </Button>

                    <Button
                      className={cn(
                        'bg-green-500 hover:bg-green-500/80 min-w-28 lg:min-w-40'
                      )}
                      onClick={() => {
                        setMintBtnClicked((prev) => !prev);
                      }}
                    >
                      <span>{mintIcon('w-4 h-4 mr-2')}</span>
                      <span>Mint</span>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <ScrollArea className="container max-w-7xl mx-auto w-full h-screen">
        <main className="p-6 xl:p-12 mb-16 lg:mb-0">
          {/* Top Section */}
          <section className="flex w-full items-center justify-between md:justify-end">
            <div className="bg-slate-700 p-1 rounded-full md:hidden">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>

            <Tooltip>
              <TooltipTrigger asChild>
                <WalletMultiButton
                  style={{
                    height: '2.5rem',
                    width: '100%',
                    background: '#0EDD4833',
                    color: '#0EDD48',
                  }}
                >
                  {publicKey ? (
                    <span className="max-w-[100px] overflow-hidden text-ellipsis">
                      {publicKey?.toString()}
                    </span>
                  ) : (
                    <>
                      <PlusIcon className="w-5 h-5 mr-2" />
                      Add Wallet
                    </>
                  )}
                </WalletMultiButton>
              </TooltipTrigger>
              <TooltipContent>Add Wallet</TooltipContent>
            </Tooltip>
          </section>

          {/* Generate Section */}
          <section className="flex flex-col space-y-2 mt-6 lg:mt-0">
            <PageTitle label="Hi Soumitra" as="h1" />
            <div className="relative group">
              <Textarea
                className="textarea-gradient bg-transparent text-white placeholder-gray-400 p-4 w-full h-40 rounded-lg border border-green-500/40 shadow-lg text-sm focus:ring-2 focus:ring-green-500 lg:text-lg text-white/80 placeholder:text-sm lg:placeholder:text-base"
                placeholder="Enter your Prompt..."
                maxLength={200}
                value={formData.text} // Bind the value to the textarea
                onChange={handleTextChange} // Update state on text change
              />
              <div className="flex items-center justify-between mt-1">
                <Button variant={'ghost'} size={'icon'}>
                  <RotateCw className="h-4 w-4 lg:w-6 lg:h-6 text-green-500" />
                </Button>
                <p className="text-end mt-1 text-sm text-muted-foreground">
                  {formData.text.length}/200
                </p>
              </div>

              {/* Inspire me button */}
              {formData.text.length <= 100 && (
                <Button
                  variant={'outline'}
                  className="absolute left-3 bottom-14 rounded-xl border-green-500 transition-opacity duration-200 opacity-100"
                >
                  <div className="flex space-x-2 items-center">
                    {bulbLightningIcon()}
                    <span className="hidden lg:block">Inspire me</span>
                  </div>
                </Button>
              )}
            </div>
          </section>

          {/* Type of NFTs */}
          <section className="flex flex-col space-y-6 mt-6 h-auto">
            <PageTitle
              label="Choose types of NFTS"
              as="h2"
              className="text-center lg:text-start"
            />
            <div className="flex flex-wrap gap-3 items-center justify-evenly lg:justify-between">
              {typeOfNFTs.map((t) => (
                <ImageContainer
                  key={t.id}
                  url={t.url}
                  label={t.label}
                  selected={t.label === formData.type}
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      type: t.label,
                    }))
                  }
                />
              ))}
            </div>
          </section>

          {/* Style Design */}
          <section className="flex flex-col space-y-6 mt-12">
            <PageTitle
              label="Choose style design"
              as="h2"
              className="text-center lg:text-start"
            />
            <div className="flex flex-wrap gap-5 items-center justify-evenly xl:justify-start">
              {buttonLabels.map((label) => (
                <Button
                  key={label}
                  variant={'outline'}
                  size={'lg'}
                  className={cn(
                    'rounded-xl border-green-500/50 min-w-36',
                    label === formData.style &&
                      'bg-green-500 hover:bg-green-500/80'
                  )}
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      style: label,
                    }));
                  }}
                >
                  {label}
                </Button>
              ))}
            </div>
          </section>

          {/* Canvas */}
          <section className="flex flex-col space-y-6 mt-10">
            <PageTitle
              label="Choose canvas"
              as="h2"
              className="text-center lg:text-start"
            />
            value
            <div className="flex flex-col lg:flex-row justify-between w-full h-fit items-baseline">
              <div className="flex flex-wrap w-full gap-5 items-center justify-evenly lg:justify-start lg:items-end">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className={cn(
                        'bg-muted-2 w-[4rem] h-[4rem]',
                        formData.canvas === 'Custom' && 'ring-4 ring-green-500'
                      )}
                      variant={'ghost'}
                      size={'icon'}
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          canvas: 'Custom',
                        }));
                      }}
                    >
                      <div className="flex w-full h-full items-center justify-center flex-col">
                        <Plus className="w-5 h-5" />
                        <span className="text-[9px]">Custom</span>
                      </div>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Set Custom Canvas</DialogTitle>
                      <DialogDescription>
                        <div className="my-5 flex items-end gap-5">
                          <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="email">
                              <span>Width (px)</span>
                            </Label>
                            <Input
                              type="number"
                              id="width"
                              name="width"
                              placeholder="Width"
                              onChange={handleCustomCanvasSize}
                            />
                          </div>

                          <div>
                            <X className="w-8 h-8" />
                          </div>
                          <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="email">
                              <span>Height (px)</span>
                            </Label>
                            <Input
                              type="number"
                              id="height"
                              name="height"
                              placeholder="Height"
                              onChange={handleCustomCanvasSize}
                            />
                          </div>
                        </div>

                        <DialogClose asChild>
                          <Button
                            variant={'primary'}
                            className="w-full"
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            Save
                          </Button>
                        </DialogClose>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>

                <Button
                  className={cn(
                    'bg-muted-2 w-[4rem] h-[4rem]',

                    formData.canvas === 'Square' && 'ring-4 ring-green-500'
                  )}
                  variant={'ghost'}
                  size={'icon'}
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      canvas: 'Square',
                    }));
                  }}
                >
                  <div className="flex items-center w-full h-full justify-center flex-col">
                    {squareIcon('w-4 h-4')}
                    <span className="text-[9px]">Square</span>
                  </div>
                </Button>
                <Button
                  className={cn(
                    'bg-muted-2 w-[4rem] h-[5rem]',
                    formData.canvas === 'Portrait' && 'ring-4 ring-green-500'
                  )}
                  variant={'ghost'}
                  size={'icon'}
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      canvas: 'Portrait',
                    }));
                  }}
                >
                  <div className="flex items-center w-full h-full justify-center flex-col">
                    {portraitIcon('w-5 h-5')}
                    <span className="text-[9px]">Portrait</span>
                  </div>
                </Button>
                <Button
                  className={cn(
                    'bg-muted-2 w-[5rem] h-[4rem]',
                    formData.canvas === 'Landscape' && 'ring-4 ring-green-500'
                  )}
                  variant={'ghost'}
                  size={'icon'}
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      canvas: 'Landscape',
                    }));
                  }}
                >
                  <div className="flex items-center w-full h-full justify-center flex-col">
                    {landscapeIcon('w-5 h-5')}
                    <span className="text-[9px]">Landscape</span>
                  </div>
                </Button>
              </div>

              <Button
                className={cn(
                  'min-w-full mt-6 lg:mt-0 lg:min-w-[30rem] bg-accent-1 hover:bg-accent-1/80'
                )}
                onClick={handleGenerateImage}
              >
                <div className="flex space-x-3 items-center">
                  {loading ? (
                    <Loader2 className="w-5 h-5 text-black animate-spin" />
                  ) : (
                    <WandSparkles className="w-5 h-5" />
                  )}
                  <p>Generate</p>
                </div>
              </Button>
            </div>
          </section>
        </main>
      </ScrollArea>
    </>
  );
}
