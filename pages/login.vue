<template>
  <div class="login">
    <h5 class="mb-5">
      <em>
        Nur die CTF darf zur Zeit das MessageRelay nutzen, solange das finale
        Relay noch nicht fertig ist :(</em
      >
    </h5>
    <div class="text-center">
      <button
        class="btn btn-primary w-75 mt-5"
        @click="$auth.loginWith('cloud')"
      >
        Mit CTF-Account anmelden!
      </button>
    </div>
  </div>
</template>

<style>
.login {
  display: float;
}
</style>