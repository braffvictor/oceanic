<template>
  <div>
    <section
      class="flex items-end p-4 md:p-8 bg-[url('https://i.pinimg.com/736x/fc/98/08/fc9808ed756f6b11956c3983ae5412c6.jpg')] min-h-96 bg-no-repeat bg-center bg-cover -mt-20"
    >
      <main>
        <div class="flex justify-between md:min-w-[75em]">
          <div>
            <img
              src="https://i.seadn.io/s/raw/files/9daac5638c64f69a4e0b0f43aa6f7990.gif?w=500&auto=format"
              class="rounded-xl min-w-24 max-w-24"
              alt=""
            />
            <p class="mt-3 md:mt-5 font-bold text-slate-100 text-2xl">
              Wolf Game (Blast) - Gems<img
                src="@/assets/verified.svg"
                alt="tick"
                class="max-w-5 inline pl-1"
              />
            </p>
            <p class="text-gray-300">
              WolfGameBlastDeployer<img
                src="@/assets/verified.svg"
                alt="tick"
                class="max-w-5 inline pl-1"
              />
            </p>
          </div>

          <div class="md:flex gap-x-3 items-end hidden">
            <div
              v-for="n in 5"
              :key="n"
              class="text-slate-100 font-bold text-lg"
            >
              <p>33 ETH</p>
              <p class="font-light">Total Volume</p>
            </div>
          </div>
        </div>
      </main>
    </section>
  </div>
</template>

<script setup></script>

<style scoped></style>
