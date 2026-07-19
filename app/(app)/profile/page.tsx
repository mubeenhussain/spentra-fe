"use client";

import { useEffect, useState, type FormEvent } from "react";
import { AppShell } from "@/components/layout/AppShell";
import {
  Button,
  CountrySelect,
  CurrencySelect,
  FormField,
  Spinner,
} from "@/components/ui";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  clearAuthError,
  fetchMe,
  selectAuth,
  updateProfile,
} from "@/store/authSlice";

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const { user, status, error } = useAppSelector(selectAuth);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    dispatch(fetchMe()).finally(() => {
      if (active) setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [dispatch]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaved(false);
    dispatch(clearAuthError());

    const fd = new FormData(e.currentTarget);
    const action = await dispatch(
      updateProfile({
        name: String(fd.get("name") ?? "").trim(),
        email: String(fd.get("email") ?? "").trim(),
        currency: String(fd.get("currency") ?? ""),
        location: String(fd.get("location") ?? ""),
      })
    );

    if (updateProfile.fulfilled.match(action)) setSaved(true);
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-lg">
        <h1 className="text-3xl font-bold tracking-tight text-heading">
          Edit profile
        </h1>
        <p className="mt-2 text-muted">Update your account details.</p>

        {loading || !user ? (
          <div className="mt-8 flex justify-center py-16">
            <Spinner label="Loading profile..." />
          </div>
        ) : (
          <form
            key={`${user._id}-${user.updatedAt}`}
            onSubmit={onSubmit}
            className="mt-8 space-y-4 rounded-2xl border border-border bg-surface p-6"
          >
            <FormField
              label="Name"
              name="name"
              required
              defaultValue={user.name ?? ""}
            />
            <FormField
              label="Email"
              name="email"
              type="email"
              required
              defaultValue={user.email ?? ""}
            />
            <CurrencySelect
              name="currency"
              required
              defaultValue={user.currency || "USD"}
            />
            <CountrySelect
              name="location"
              label="Location"
              required
              defaultValue={user.location || "Pakistan"}
            />

            {error && (
              <p
                role="alert"
                className="rounded-xl bg-danger-soft px-4 py-3 text-sm text-danger-text"
              >
                {error}
              </p>
            )}
            {saved && !error && (
              <p className="rounded-xl bg-brand-soft px-4 py-3 text-sm text-brand-text">
                Profile updated.
              </p>
            )}

            <div className="flex justify-end pt-2">
              <Button type="submit" loading={status === "loading"}>
                Save changes
              </Button>
            </div>
          </form>
        )}
      </div>
    </AppShell>
  );
}
