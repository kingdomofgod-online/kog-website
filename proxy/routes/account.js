import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import fetchData from '../utils/fetcher.js'; // Adjust the path as necessary
dotenv.config();

const router = express.Router();

const baseUrl = process.env.API_ENDPOINT_ACCOUNT;

// GET routes
router.get('/cog/:userId', (req, res) => {
  const { userId } = req.params;
  const url = `${baseUrl}/api/account/byid/cog?userId=${userId}`;
  fetchData(url, { method: 'GET', headers: { 'Content-Type': 'application/json' } }, res);
});

router.get('/profile/:userId', (req, res) => {
  const { userId } = req.params;
  const url = `${baseUrl}/api/account/byid/profile?userId=${userId}`;
  fetchData(url, { method: 'GET', headers: { 'Content-Type': 'application/json' } }, res);
});

router.get('/user/email/:email', (req, res) => {
  const { email } = req.params;
  const url = `${baseUrl}/api/account/byemail/${encodeURIComponent(email)}`;
  fetchData(url, { method: 'GET', headers: { 'Content-Type': 'application/json' } }, res);
});

router.get('/banned-ips', (req, res) => {
  const url = `${baseUrl}/api/account/bannedips`;
  fetchData(url, { method: 'GET', headers: { 'Content-Type': 'application/json' } }, res);
});

router.get('/user/:userId', (req, res) => {
  const { userId } = req.params;
  const url = `${baseUrl}/api/account/byid/${userId}`;
  fetchData(url, { method: 'GET', headers: { 'Content-Type': 'application/json' } }, res);
});

router.get('/user/friend/:friendId', (req, res) => {
  const { friendId } = req.params;
  const url = `${baseUrl}/api/account/byfriendId/${friendId}`;
  fetchData(url, { method: 'GET', headers: { 'Content-Type': 'application/json' } }, res);
});

router.get('/users/same-ip/:ipAddress', (req, res) => {
  const { ipAddress } = req.params;
  const url = `${baseUrl}/api/account/sameIP?ipAddress=${ipAddress}`;
  fetchData(url, { method: 'GET', headers: { 'Content-Type': 'application/json' } }, res);
});

router.get('/caller-ip', (req, res) => {
  const url = `${baseUrl}/api/account/get/ipinfo`;
  fetchData(url, { method: 'GET', headers: { 'Content-Type': 'application/json' } }, res);
});

// POST routes
router.post('/ban-ip', (req, res) => {
  const url = `${baseUrl}/api/account/banip`;
  fetchData(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req.body),
  }, res);
});

router.post('/create-user', (req, res) => {
  const url = `${baseUrl}/api/account/create`;
  fetchData(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req.body),
  }, res);
});

router.post('/login', (req, res) => {
  const { email, password, token, googleToken, ipAddress } = req.body;
  const url = `${baseUrl}/api/account/login?ipAddress=${ipAddress}`;
  fetchData(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, token, googleToken }),
  }, res);
});

router.post('/forgot-password', (req, res) => {
    const { email } = req.body;
    const url = `${baseUrl}/api/account/update/password/forgot?email=${encodeURIComponent(email)}`;
    fetchData(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }, res);
  });

router.post('/update-password', (req, res) => {
  const { userId, oldPassword, newPassword, ipAddress } = req.body;
  const url = `${baseUrl}/api/account/update/password?userId=${encodeURIComponent(userId)}&oldPassword=${encodeURIComponent(oldPassword)}&newPassword=${encodeURIComponent(newPassword)}&ipAddress=${encodeURIComponent(ipAddress)}`;
  fetchData(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  }, res);
});

router.post('/add-ip-info', (req, res) => {
  const { userId, ipAddress } = req.body;
  const url = `${baseUrl}/api/account/update/ipinfo?userId=${userId}&ipAddress=${ipAddress}`;
  fetchData(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  }, res);
});

// PUT routes
router.put('/update-user', (req, res) => {
  const url = `${baseUrl}/api/account/update/user`;
  fetchData(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req.body),
  }, res);
});

router.put('/update-cog', (req, res) => {
    const url = `${baseUrl}/api/account/update/cog`;
    fetchData(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    }, res);
  });

  router.put('/update-profile', (req, res) => {
    const url = `${baseUrl}/api/account/update/profile`;
    fetchData(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    }, res);
  });

router.put('/update-user-banned', (req, res) => {
  const { userId, days, isForever } = req.body;
  const url = `${baseUrl}/api/account/banned?userId=${userId}&days=${days}&isForever=${isForever}`;
  fetchData(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
  }, res);
});

// DELETE route
router.delete('/delete-user/:userId', (req, res) => {
  const { userId } = req.params;
  const url = `${baseUrl}/api/account/byid/delete?userId=${userId}`;
  fetchData(url, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  }, res);
});

export default router;
