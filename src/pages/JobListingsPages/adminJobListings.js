import React from 'react'
import AdminJobListing from './adminJobListing'
import { DataStore } from '@aws-amplify/datastore';
import { JobListing } from '../../models';
import { ThemeProvider } from '@mui/material/styles';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import {Stack, Button, Box, } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useState, useRef, useEffect} from 'react';
import AdminHeader from '../../ui-components/AdminHeader';
import theme from './theme';

export default function AdminJobListings({listings}) {
  return (
    listings.map((listing) => {
      return <AdminJobListing key={listing.id} listing={listing} />
    })
  )
}
