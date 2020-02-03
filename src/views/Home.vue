<template>
  <div class="container text-center d-flex justify-content-center align-items-center">
    <div class="content w-100 overflow-auto py-4 m-auto h-100">
      <div v-if="image">
        <canvas
          id="canvas"
          ref="canvas"
          style="max-width:375px"
          class="w-100 shadow rounded"
        >Your browser does not support the HTML5 canvas tag.</canvas>

        <input
          v-model="textTop"
          value
          type="text"
          placeholder="Top Text"
          class="form-control mt-4 mb-1"
        />
        <input
          v-model="textBottom"
          value
          type="text"
          placeholder="Bottom Text"
          class="form-control mt-1 mb-4"
        />
      </div>

      <image-uploader
        :debug="0"
        :quality="0.7"
        :autoRotate="true"
        outputFormat="verbose"
        :preview="false"
        :className="['fileinput']"
        :capture="false"
        accept="image/*"
        @input="setImage"
      >
        <label for="fileInput" slot="upload-label" class="w-100">
          <span class="btn btn-primary btn-block upload-caption">Change Image</span>
        </label>
      </image-uploader>
      <a
        v-if="image"
        @click="saveImage"
        ref="button"
        class="btn btn-success btn-block text-white"
        download
      >Save Image</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      image: {
        info: {
          newWidth: 411,
          newHeight: 513
        },
        dataUrl: require("@/assets/img/image.jpg")
      },
      textTop: "ฮั่นแน่",
      textBottom: "เห็นนะ!"
    };
  },
  mounted() {
    this.renderCanvas();
  },
  watch: {
    textTop() {
      this.renderCanvas();
    },
    textBottom() {
      this.renderCanvas();
    }
  },
  methods: {
    setImage: function(output) {
      this.image = output;

      this.renderCanvas();
    },
    getFontSizeToFit(text, fontFace, maxWidth) {
      let size = this.measureTextBinaryMethod(text, fontFace, 0, 600, maxWidth);
      return size;
    },
    measureTextBinaryMethod(text, fontface, min, max, desiredWidth) {
      let context = document.createElement("canvas").getContext("2d");

      let found = 0;
      if (max - min < 1) {
        return min;
      }
      let test = min + (max - min) / 2; //Find half interval
      context.font = test + "px " + fontface;
      let measureTest = context.measureText(text).width;
      if (measureTest > desiredWidth) {
        found = this.measureTextBinaryMethod(
          text,
          fontface,
          min,
          test,
          desiredWidth
        );
      } else {
        found = this.measureTextBinaryMethod(
          text,
          fontface,
          test,
          max,
          desiredWidth
        );
      }
      return found;
    },
    renderCanvas() {
      let self = this;
      let fontFace = "Kanit";

      self.$nextTick(function() {
        let canvas = self.$refs.canvas;
        let ctx = canvas.getContext("2d");

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (self.image) {
          canvas.width = self.image.info.newWidth;
          canvas.height = self.image.info.newHeight;

          let img = new Image();
          img.src = self.image.dataUrl;

          img.onload = function() {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            if (self.textBottom) {
              let fontSize = Math.min(
                self.getFontSizeToFit(
                  self.textBottom,
                  fontFace,
                  canvas.width / 1.3
                ),
                72
              );
              ctx.font = `900 ${fontSize}px ${fontFace}`;
              ctx.textAlign = "center";
              ctx.lineWidth = fontSize * 0.05;
              ctx.strokeText(
                self.textBottom,
                canvas.width / 2,
                canvas.height - 48
              );
              ctx.fillStyle = "white";
              ctx.fillText(
                self.textBottom,
                canvas.width / 2,
                canvas.height - 48
              );
              ctx.strokeStyle = "black";
            }

            if (self.textTop) {
              let fontSize = Math.min(
                self.getFontSizeToFit(
                  self.textTop,
                  fontFace,
                  canvas.width / 1.3
                ),
                72
              );
              ctx.font = `900 ${fontSize}px ${fontFace}`;
              ctx.textAlign = "center";
              ctx.lineWidth = fontSize * 0.05;
              ctx.strokeText(self.textTop, canvas.width / 2, 100);
              ctx.fillStyle = "white";
              ctx.fillText(self.textTop, canvas.width / 2, 100);
              ctx.strokeStyle = "black";
            }
          };
        }
      });
    },
    saveImage() {
      let self = this;

      self.$nextTick(function() {
        let canvas = self.$refs.canvas;
        let button = self.$refs.button;
        var dataURL = canvas.toDataURL("image/png");
        button.href = dataURL;
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
#fileInput {
  display: none;
}
.container {
  height: 100vh;
  max-height: 100vh;
  max-width: 440px !important;
}
.content::-webkit-scrollbar {
  display: none !important;
}
</style>
