'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Label from '@/components/ui/Label'
import Alert from '@/components/ui/Alert'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // لاگیک اعتبارسنجی و ارسال
    if (!email || !password) {
      setError('لطفا ایمیل و رمز عبور را وارد کنید.')
      return
    }
    setError(null)
    // ادامه‌ی ارسال لاگین
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 border rounded flex flex-col gap-4">
      {error && <Alert variant="error">{error}</Alert>}
      <div>
        <Label htmlFor="email">ایمیل</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          placeholder="ایمیل خود را وارد کنید"
        />
      </div>
      <div>
        <Label htmlFor="password">رمز عبور</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          placeholder="رمز عبور خود را وارد کنید"
        />
      </div>
      <Button fullWidth type="submit">
        ورود
      </Button>
    </form>
  )
}
