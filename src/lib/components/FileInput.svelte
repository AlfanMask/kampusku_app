<script lang="ts">
    import { createEventDispatcher } from "svelte";
  
    let file: File | null = null;
    const dispatch = createEventDispatcher();
  
    const formatFileSize = (size: number): string => {
      if (size < 1024) return size + " B";
      if (size < 1024 * 1024) return (size / 1024).toFixed(1) + " KB";
      return (size / (1024 * 1024)).toFixed(2) + " MB";
    };
  
    const handleFileChange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        const selectedFile = target.files[0];
  
        if (selectedFile.size > 1024 * 1024 * 3) { // 1 MB limit
          alert("Ukuran file harus kurang dari 3 MB!");
          return;
        }
  
        file = selectedFile;
        dispatch("fileSelected", file); // Emit event with file data
      }
    };
  
    const removeFile = () => {
      file = null;
      dispatch("fileRemoved"); // Emit event when file is removed
    };
  </script>
  
  <div class="w-full">
    {#if !file}
      <!-- File Input -->
      <label class="flex flex-col items-center justify-center w-full h-[74px] border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
        <div class="flex flex-col items-center gap-3 ">
          <i class="fa-solid fa-upload !text-sm"></i>
          <p class='!text-secondary !text-xs'>Upload gambar / video (jika perlu)</p>
        </div>
        <input
          type="file"
          class="hidden"
          accept="image/*,video/*"
          on:change={handleFileChange}
        />
      </label>
    {:else}
      <!-- File Details -->
      <div class="flex items-center justify-between w-full p-3 bg-gray-100 rounded-lg shadow-md">
        <div>
          <p class="text-sm font-medium text-gray-700">{file.name}</p>
          <p class="text-xs text-gray-500">{formatFileSize(file.size)}</p>
        </div>
        <button
          on:click={removeFile}
          class="ml-2 text-red-500 hover:text-red-700"
          title="Remove File"
        >
          ✖
        </button>
      </div>
    {/if}
  </div>
  