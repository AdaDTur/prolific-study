// set up experiment logic for each slide
function make_slides(f) {
  var slides = {};

  // set up initial slide
  slides.i0 = slide({
    name: "i0",
    start: function() {
      exp.startT = Date.now();
    },
    log_responses: function() {
      exp.consent.push({
        "consent": "I consent to take part in the study. I agree to the anonymous use of the data in research presentations, publications, and online interactive sites to illustrate the findings. I agree that the collected data could be used in related follow-up studies. I agree to the use of the data in a not-for-profit anonymous corpus for research purposes which others will have access to."
      });
    },
    button: function() {
      this.log_responses();
      exp.go(); //use exp.go() if and only if there is no "present" data.
    },
  });

  // set up the first example slide
  slides.example1 = slide({
    name: "example1",
    start: function() {
      $('.badrating_err').hide();
      $('.norating_err').hide(); // ensure error messages are hidden
    },
    button: function() {
      this.radio = $("input[name='number']:checked").val();
      if (this.radio) {
        if (this.radio == "1" || this.radio == "2" || this.radio == "3") {
          this.log_responses();
          exp.go();
        } else {
          $('.norating_err').hide();
          $('.badrating_err').show();
        }
      } else {
        $('.badrating_err').hide();
        $('.norating_err').show();
      }
    },
    log_responses: function() {
      exp.data_trials.push({
        "slide_number_in_experiment": exp.phase,
        "id": "example1",
        "response": this.radio,
      });
    },
  });

  // set up other slides similarly...
  // Repeat the error hiding approach across all slides consistently
  // Other slides such as example2, trial1, trial2, and so on, will have the same structure.

  return slides;
}

// initialize experiment
function init() {
  exp.trials = [];
  exp.catch_trials = [];
  exp.consent = [];
  var stimuli = all_stims;

  var list_index = parseInt(get_url_param("list", 0)); // Get list param, default to 0
  exp.stimuli = _.shuffle(stimuli[list_index]);

  exp.n_trials = exp.stimuli.length;
  var fifth = exp.stimuli.length / 5;
  exp.stimuli1 = exp.stimuli.slice(0, fifth);
  exp.stimuli2 = exp.stimuli.slice(fifth, 2 * fifth);
  exp.stimuli3 = exp.stimuli.slice(2 * fifth, 3 * fifth);
  exp.stimuli4 = exp.stimuli.slice(3 * fifth, 4 * fifth);
  exp.stimuli5 = exp.stimuli.slice(4 * fifth);

  exp.system = {
    Browser: BrowserDetect.browser,
    OS: BrowserDetect.OS,
    screenH: screen.height,
    screenUH: exp.height,
    screenW: screen.width,
    screenUW: exp.width,
  };

  exp.structure = [
    "i0",
    "example1",
    "example2",
    "startExp",
    "trial1",
    "attention1",
    "trial2",
    "attention2",
    "trial3",
    "attention3",
    "trial4",
    "attention4",
    "trial5",
    "attention5",
    "subj_info",
    "thanks",
  ];

  exp.data_trials = [];

  exp.slides = make_slides(exp);
  exp.nQs = utils.get_exp_length();

  $('.slide').hide(); //hide everything

  $("#start_button").click(function() {
    exp.go();
  });

  exp.go(); //show first slide
}
