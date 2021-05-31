import React from 'react';
import { io } from 'socket.io-client';
import { SOCKET_BASE_URL } from './constants/config';

// Configure socket to use in any component
export const socket = io(SOCKET_BASE_URL);
export const SocketContext = React.createContext();
