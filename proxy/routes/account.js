// routes/data.js
import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const credentials = {
  [process.env.API_KEY_NAME]: process.env.API_KEY,
};

const baseUrl = process.env.API_ENDPOINT_ACCOUNT;

router.get('/cog/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const apiResponse = await fetch(
      `${baseUrl}/api/account/GetCoG?userId=${userId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // add any authentication headers if required
        },
      },
    );

    if (!apiResponse.ok) {
      throw new Error('Failed to fetch CoG data');
    }

    const data = await apiResponse.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/profile/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const apiResponse = await fetch(
      `${baseUrl}/api/account/GetProfile?userId=${userId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!apiResponse.ok) {
      throw new Error('Failed to fetch profile');
    }

    const data = await apiResponse.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/user/email/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const apiResponse = await fetch(
      `${baseUrl}/api/account/GetUserByEmail?email=${encodeURIComponent(email)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!apiResponse.ok) {
      throw new Error('Failed to fetch user by email');
    }

    const data = await apiResponse.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/banned-ips', async (req, res) => {
  try {
    const apiResponse = await fetch(`${baseUrl}/api/account/GetBannedIPs`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!apiResponse.ok) {
      throw new Error('Failed to fetch banned IPs');
    }

    const data = await apiResponse.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const apiResponse = await fetch(
      `${baseUrl}/api/account/GetUserById?userId=${userId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!apiResponse.ok) {
      throw new Error('Failed to fetch user by ID');
    }

    const data = await apiResponse.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/user/friend/:friendId', async (req, res) => {
  try {
    const { friendId } = req.params;
    const apiResponse = await fetch(
      `${baseUrl}/api/account/GetUserByFriendId?friendId=${friendId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!apiResponse.ok) {
      throw new Error('Failed to fetch user by friend ID');
    }

    const data = await apiResponse.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/users/same-ip/:ipAddress', async (req, res) => {
  try {
    const { ipAddress } = req.params;
    const apiResponse = await fetch(
      `${baseUrl}/api/account/GetUsersWithSameIP?ipAddress=${ipAddress}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!apiResponse.ok) {
      throw new Error('Failed to fetch users with the same IP');
    }

    const data = await apiResponse.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/caller-ip', async (req, res) => {
  try {
    const apiResponse = await fetch(`${baseUrl}/api/account/GetCallerIp`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!apiResponse.ok) {
      throw new Error('Failed to fetch caller IP');
    }

    const data = await apiResponse.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/ban-ip', async (req, res) => {
  try {
    const { ipv4, ipv6, reason } = req.body;
    const bannedIp = {
      ipv4,
      ipv6,
      reason,
    };

    const apiResponse = await fetch(`${baseUrl}/api/account/BanIP`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bannedIp),
    });

    if (!apiResponse.ok) {
      throw new Error('Failed to ban IP');
    }

    res.json({ message: 'IP banned successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/create-user', async (req, res) => {
  try {
    const { email, password, googleToken } = req.body;
    const userInfo = {
      email,
      password,
      googleToken,
    };

    const apiResponse = await fetch(`${baseUrl}/api/account/CreateUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    if (!apiResponse.ok) {
      throw new Error('Failed to create user');
    }

    res.json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password, token, googleToken, ipAddress } = req.body;
    const login = {
      email,
      password,
      token,
      googleToken,
    };
    const apiResponse = await fetch(
      `${baseUrl}/api/account/LoginUser?ipAddress=${ipAddress}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(login),
      },
    );

    if (!apiResponse.ok) {
      throw new Error('Failed to login user');
    }

    res.json({ message: 'User logged in successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const apiResponse = await fetch(
      `${baseUrl}/api/account/ForgotPassword?email=${encodeURIComponent(email)}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!apiResponse.ok) {
      throw new Error('Failed to send forgot password email');
    }

    res.json({ message: 'Forgot password email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/add-ip-info', async (req, res) => {
  try {
    const { userId, ipAddress } = req.body;
    const apiResponse = await fetch(
      `${baseUrl}/api/account/AddIPInfo?userId=${userId}&ipAddress=${ipAddress}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!apiResponse.ok) {
      throw new Error('Failed to add IP info');
    }

    res.json({ message: 'IP info added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.put('/update-user', async (req, res) => {
  try {
    const user = req.body;
    const apiResponse = await fetch(`${baseUrl}/api/account/UpdateUser`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (!apiResponse.ok) {
      throw new Error('Failed to update user');
    }

    res.json({ message: 'User updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.put('/update-user-banned', async (req, res) => {
  try {
    const { userId, days, isForever } = req.body;
    const apiResponse = await fetch(
      `${baseUrl}/api/account/UpdateUserBanned?userId=${userId}&days=${days}&isForever=${isForever}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!apiResponse.ok) {
      throw new Error('Failed to update user ban status');
    }

    res.json({ message: 'User ban status updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.delete('/delete-user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const apiResponse = await fetch(
      `${baseUrl}/api/account/DeleteUserById?userId=${userId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!apiResponse.ok) {
      throw new Error('Failed to delete user');
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
