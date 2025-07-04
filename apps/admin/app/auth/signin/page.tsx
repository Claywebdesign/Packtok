import AdminSignInForm from "components/auth/signin-form";

export default function SignInPage() {
  return (
    <main className="space-y-8">
      <div>
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Admin Login
        </h2>
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800 text-center">
            <strong>Demo Credentials:</strong>
            <br />
            Email: founder@packtok.io
            <br />
            Password: ChangeMe!
          </p>
        </div>
      </div>
      <AdminSignInForm />
    </main>
  );
}
