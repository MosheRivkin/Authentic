type AuthLocals = {
  session: import("lucia").Session | null;
  user: import("lucia").User | null;
};
