'use client';

import AuthGate from '@/components/admin/AuthGate';
import AdminShell from '@/components/admin/AdminShell';

export default function AdminPage() {
  return (
    <AuthGate>
      {(user, signOut) => <AdminShell user={user} onSignOut={signOut} />}
    </AuthGate>
  );
}
