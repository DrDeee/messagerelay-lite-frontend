<template>
  <div class="pt-5">
    <h5 class="mt-5">
      <em>
        Nur die CTF darf zur Zeit das MessageRelay nutzen, solange das finale
        Relay noch nicht fertig ist :(</em
      >
    </h5>
    <button
      class="btn btn-primary w-100 mt-2"
      @click="$auth.loginWith('cloud')"
    >
      Mit CTF-Account anmelden!
    </button>
  </div>
</template>