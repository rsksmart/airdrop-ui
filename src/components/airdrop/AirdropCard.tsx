import Button from '../common/Button'
import XIcon from '../icons/XIcon'
import ProgressBar from './ProgressBar'
import AirdropIcon from '../icons/AirdropIcon'
import ArrowRightIcon from '../icons/ArrowRightIcon'
import { useAuth } from '@/context/AuthContext'
import Badge from '../common/Badge'
import { IAirdrop } from '@/interface/IAirdrop'
import Connect from '../navigation/Connect'
import MerkleData from '@/utils/merkleData.json'
import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

type props = {
  background?: string
  dialog?: boolean
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined
  onCloseDialog?: React.MouseEventHandler<HTMLButtonElement> | undefined
  airdrop: IAirdrop
}

function AirdropCard({ background = 'bg-custom-orange', onClick, dialog = false, airdrop, onCloseDialog }: props) {
  const { isAdmin, address, domain, gasless, setGasless } = useAuth();
  const [amount, setAmount] = useState<string>('0');
  let disabled = false;
  if (address) disabled = !isAdmin ? (!airdrop.isAllowed || airdrop.isClaimed! || airdrop?.isExpired! || airdrop.balance === 0) : false;
  
  useEffect(() => {
    if (airdrop.airdropType !== 'merkle') return;
    const claim = MerkleData.claims.find(claim => claim.address.toLowerCase() === address.toLowerCase());
    setAmount(claim?.amount ? ethers.formatUnits(claim?.amount, 18).toString() : '0');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address])

  return (
    <article className={`${
      (disabled && !dialog) 
        ? 'cursor-not-allowed bg-zinc-950/50 border-zinc-700/50 opacity-75' 
        : 'border-white/20 bg-black/40 backdrop-blur-sm hover:bg-black/60 hover:border-white/30'
    } rounded-2xl justify-between gap-3 relative transition-all duration-300 ${
      dialog 
        ? 'w-full p-4 sm:p-6' 
        : 'border p-4 sm:p-6 lg:p-7 w-full max-w-[400px] hover:shadow-lg hover:shadow-white/10'
    }`}>
      
      {/* Badges and Admin Controls */}
      <div className={`absolute -top-2 sm:-top-3 right-2 sm:right-4 px-2 flex flex-wrap gap-1 sm:gap-2 ${!dialog ? '' : 'hidden'}`}>
        {(!airdrop.isAllowed && address) && (
          <Badge color='pink' title='claim no allowed' />
        )}
        {(airdrop.isClaimed && address) && (
          <Badge color='green' title='claimed' />
        )}
        {(airdrop.isExpired && address) && (
          <Badge color='lime' title='Expired' />
        )}
        {(airdrop.balance === 0 && address) && (
          <Badge color='cyan' title='No Balance' />
        )}
        {isAdmin && (
          <Button
            onClick={onCloseDialog}
            className='group text-xs'
            rounded
            variant='secondary'
            width={80}
            height={25}
          >
            <span className='flex items-center gap-1'>
              <span className="hidden sm:inline">Remove</span>
              <XIcon className='group-hover:stroke-white stroke-black w-3 h-3' />
            </span>
          </Button>
        )}
      </div>

      {/* Main Content */}
      <section className='flex flex-col lg:flex-row w-full gap-4'>
        <div className='flex-1 lg:w-2/3'>
          <h3 className={`${background} w-max font-semibold text-lg sm:text-xl px-2 py-1 text-black rounded-md mb-3`}>
            {airdrop.name}
          </h3>
          
          <ProgressBar value={airdrop.progress!} background={background} />
          
          <section className='w-full mt-4 space-y-3'>
            <div className='flex justify-between items-center py-2 border-b border-zinc-700/50'>
              <h6 className="text-sm sm:text-base text-zinc-300">Amount to receive</h6>
              <p className="font-semibold text-sm sm:text-base">
                {airdrop.airdropType === 'merkle' ? amount : airdrop.claimAmount}
              </p>
            </div>
            <div className='flex justify-between items-center py-2 border-b border-zinc-700/50'>
              <h6 className="text-sm sm:text-base text-zinc-300">Total available</h6>
              <p className="font-semibold text-sm sm:text-base">{airdrop.airdropAmountLeft}</p>
            </div>
            <div className='flex justify-between items-center py-1'>
              <h6 className="text-xs sm:text-sm text-zinc-500 font-semibold">Expiration date</h6>
              <p className="text-xs sm:text-sm text-zinc-500">{airdrop.expirationDate.toDateString()}</p>
            </div>
            <div className='flex justify-between items-center py-1'>
              <h6 className="text-xs sm:text-sm text-zinc-500 font-semibold">Type</h6>
              <p className="text-xs sm:text-sm text-zinc-500 capitalize">{airdrop.airdropType}</p>
            </div>
          </section>
        </div>

        {/* Icon and Action Button */}
        <div className='flex lg:flex-col justify-between lg:justify-start items-center lg:items-end gap-4 lg:w-1/3'>
          <div className="order-2 lg:order-1">
            <AirdropIcon className="w-12 h-12 sm:w-16 sm:h-16" />
          </div>
          
          <div className="flex flex-col items-end gap-3 order-1 lg:order-2">
            <Button
              show={(!dialog || !!address)}
              onClick={onClick}
              className='group !px-2 sm:!px-3'
              width={dialog ? 76 : 45}
              outline
              variant={dialog ? 'secondary' : 'primary'}
              disabled={disabled}
            >
              {dialog ? (
                <span className="text-sm font-medium">claim</span>
              ) : (
                <ArrowRightIcon className={`${disabled ? '' : 'group-hover:fill-black'} fill-white w-4 h-4`} />
              )}
            </Button>

            {/* Gasless Toggle */}
            {(dialog && address && !domain) && (
              <div className="flex gap-2 items-center text-sm">
                <label htmlFor="gasless-toggle" className="text-zinc-300 cursor-pointer">gasless</label>
                <label className="flex relative items-center cursor-pointer">
                  <input
                    id="gasless-toggle"
                    checked={gasless}
                    type="checkbox"
                    className="sr-only"
                    onChange={(e) => setGasless(Boolean(e.target.checked))}
                  />
                  <span className="w-9 h-5 bg-zinc-700 rounded-full border border-zinc-600 toggle-bg relative transition-colors duration-200">
                    <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${gasless ? 'translate-x-4' : 'translate-x-0'}`}></span>
                  </span>
                </label>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Connect Section for Non-authenticated Users */}
      <section className={`mt-6 ${!(!address && dialog) ? 'hidden' : ''}`}>
        <div className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-700/50">
          <Connect 
            className='flex gap-3 flex-col items-center justify-center' 
            connectWalletTitle='Connect wallet to claim' 
            connectRNSTitle="Use RNS to claim"
            width={200}
          />
        </div>
      </section>

      {/* Description Section */}
      <section className={`mt-6 ${dialog ? '' : 'hidden'}`}>
        <div className="bg-zinc-900/30 rounded-lg p-4 border border-zinc-700/30">
          <h4 className='font-semibold text-sm sm:text-base mb-3 text-white'>Description</h4>
          <p className='text-xs sm:text-sm text-zinc-400 leading-relaxed'>
            nisi porta lorem mollis aliquam ut porttitor leo a diam sollicitudin tempor id eu nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit amet risus nullam eget felis eget nunc lobortis mattis aliquam faucibus purus in massa tempor nec
          </p>
        </div>
      </section>
    </article>
  )
}

export default AirdropCard
