import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { 
  login as loginAction,
  logout as logoutAction,
  register as registerAction 
} from '../store/slices/authSlice'
import authService from '../api/auth'

const useAuth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, token, isLoading, error } = useSelector((state) => state.auth)

  useEffect(() => {
    // Перенаправление если пользователь авторизован
    if (token) {
      navigate('/profile')
    }
  }, [token, navigate])

  const login = async (credentials) => {
    try {
      dispatch(loginAction(credentials))
    } catch (err) {
      console.error('Login error:', err)
      throw err
    }
  }

  const register = async (userData) => {
    try {
      dispatch(registerAction(userData))
    } catch (err) {
      console.error('Registration error:', err)
      throw err
    }
  }

  const logout = () => {
    authService.logout()
    dispatch(logoutAction())
    navigate('/')
  }

  const updateUser = async (userData) => {
    try {
      const updatedUser = await authService.updateUser(userData, token)
      return updatedUser
    } catch (err) {
      console.error('Update user error:', err)
      throw err
    }
  }

  return {
    user,
    token,
    isLoading,
    error,
    isAuthenticated: !!token,
    login,
    register,
    logout,
    updateUser
  }
}

export default useAuth