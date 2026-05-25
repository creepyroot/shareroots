export type AppView = 'home' | 'send' | 'receive';

export interface FileMetadata {
  name: string;
  size: number;
  type: string;
}

export type TransferStatus = 
  | 'idle' 
  | 'generating_id'
  | 'waiting_for_peer' 
  | 'connecting' 
  | 'negotiating'
  | 'waiting_for_approval'
  | 'transferring' 
  | 'completed' 
  | 'error'
  | 'reconnecting';

export type SignalMessage = 
  | { type: 'metadata'; metadata: FileMetadata; index: number; total: number }
  | { type: 'accept'; startOffset: number } // Receiver tells sender to start/resume from this byte offset
  | { type: 'file-data'; buffer: ArrayBuffer }
  | { type: 'file-complete' }
  | { type: 'ready-for-next' }
  | { type: 'all-complete' };
