import React from 'react';
import socketIOClient from 'socket.io-client';
import { API_BASE_URL } from './constants/config';

// Configure socket to use in any component
export const socket = socketIOClient(API_BASE_URL);
export const SocketContext = React.createContext();
