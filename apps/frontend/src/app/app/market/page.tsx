'use client';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { marketPlaceNFTs } from '@/constant';
import { cn } from '@/lib';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { ChevronRight, Filter, Loader2, PlusIcon, X } from 'lucide-react';
import * as React from 'react';
import MarketPlaceCard from '../_components/marketplace-page/marketplace-card';
import SearchBox from '../_components/search-box';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import { config } from '@/config';

const filterOptionsData = [
  {
    label: 'All',
    visible: true,
  },
  {
    label: 'Utility',
    visible: true,
  },
  {
    label: 'Art',
    visible: true,
  },
  {
    label: 'Game',
    visible: false,
  },
  {
    label: 'Music',
    visible: false,
  },
];

type FilterOptions = (typeof filterOptionsData)[number]['label'];

const MarketPage = () => {
  const [activeFilter, setActiveFilter] = React.useState<FilterOptions>('All');
  const [visibleAllFilters, setVisibleAllFilters] = React.useState(false);

  const [search, setSearch] = React.useState('');
  const [filterOptions, setFilterOptions] = React.useState([
    ...filterOptionsData,
  ]);

  const { toast } = useToast();

  // Query Client
  const { data, isLoading } = useQuery({
    queryKey: ['marketplace'],
    queryFn: async () => {
      try {
        const response = await axios.get(config.MARKETPLACE);

        if (response.status === 200) {
          return response.data;
        }

        return response;
      } catch (error) {
        console.error(error);
        toast({
          title: 'Error Fetching Marketplace Data',
          description:
            'Failed to fetch marketplace data. Please try again later.',
        });
        throw error;
      }
    },
  });

  console.log('Data: ', data);

  const handleShowAllButtons = async () => {
    if (visibleAllFilters) {
      // Then Close
      setVisibleAllFilters(false);
      setFilterOptions([...filterOptionsData]);
    } else {
      // Open
      setVisibleAllFilters(true);
      setFilterOptions((prev) =>
        prev?.map((option) => {
          const newOption = {
            ...option,
          };
          newOption.visible = true;
          return newOption;
        })
      );
    }
  };

  return (
    <ScrollArea className="container mx-auto max-w-7xl w-full h-screen">
      <main className="p-12">
        {/* Search + Add Wishlist Section */}
        <section className="flex items-center justify-between">
          <SearchBox
            value={search}
            onChange={(value) => {
              setSearch(value);
            }}
          />
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
                <PlusIcon className="w-5 h-5 mr-2" />
                Add Wallet
              </WalletMultiButton>
            </TooltipTrigger>
            <TooltipContent>Add Wallet</TooltipContent>
          </Tooltip>
        </section>

        {/* Filter Section */}
        <section className="flex items-center space-x-2 mt-6">
          <Button variant={'ghost'} size={'icon'} className="h-10 w-10">
            <Filter className="w-4 h-4" />
          </Button>

          {/* Filter Buttons */}
          {filterOptions
            ?.filter((f) => f.visible)
            ?.map((f) => (
              <Button
                key={f.label}
                variant={activeFilter === f.label ? 'primary' : 'tertiary'}
                className={cn(
                  'w-28 h-10',
                  activeFilter === f.label
                    ? 'bg-accent-1/50 text-white hover:bg-accent-1/30'
                    : ''
                )}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  setActiveFilter(f.label);
                }}
              >
                {f.label}
              </Button>
            ))}

          {/* Show All Buttons */}
          <Button
            variant={'ghost'}
            size={'icon'}
            className={cn('h-10 w-10')}
            onClick={handleShowAllButtons}
          >
            {visibleAllFilters ? (
              <X className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </Button>
        </section>

        {/* Cards Section */}
        {isLoading ? (
          <section className="w-full h-[calc(100vh-10rem)] flex items-center justify-center">
            <Loader2 className="h-12 w-12 animate-spin text-accent-1" />
          </section>
        ) : (
          <section className="grid grid-cols-12 gap-5 mt-8">
            {marketPlaceNFTs?.map((c) => (
              <MarketPlaceCard
                className={cn('col-span-4')}
                key={c.id}
                id={c.id}
                label={c.label}
                tag={c.tag}
                price={c.price}
                totalLikes={c.totalLikes}
                liked={c.liked}
                imageUrl={c.image}
                createdBy={c.createdBy}
              />
            ))}
          </section>
        )}
      </main>
    </ScrollArea>
  );
};

export default MarketPage;
