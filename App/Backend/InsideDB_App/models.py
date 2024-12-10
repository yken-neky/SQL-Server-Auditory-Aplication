from django.db import models

class Controls_Information(models.Model):
    class Chapter(models.TextChoices):
        CHAPTER_TWO = '2', 'Two'
        CHAPTER_THREE = '3', 'Three'
        CHAPTER_FOUR = '4', 'Four'
        CHAPTER_FIVE = '5', 'Five'
        CHAPTER_SIX = '6', 'Six'
        CHAPTER_SEVEN = '7', 'Seven'

    id = models.AutoField(primary_key=True)
    index = models.IntegerField(default=0)
    name = models.CharField(max_length=255, default="Control Name") #nombre del control
    chapter = models.CharField(max_length=10, choices=Chapter.choices, default=Chapter.CHAPTER_TWO)
    description = models.TextField(default="Description")
    impact = models.TextField(default="Impact")
    good_config = models.TextField(default="Este parámetro se encuentra configurado de forma correcta en su servidor.")
    bad_config = models.TextField(default="Este parámetro se encuentra configurado de forma incorrecta en su servidor. ")
    references = models.URLField(default="http://References.ref")

    class Meta: 
        unique_together = [
            'index', 'chapter'
        ]

class Controls_Scripts(models.Model):
    class ControlType(models.TextChoices):
        MANUAL = 'manual', 'Manual'
        AUTOMATIC = 'automatic', 'Automatic'

    class ValidationType(models.TextChoices):
        SINGLE_ROW = 'single_row', 'Single Row'
        NO_ROWS = 'no_rows', 'No Rows'
    
    control_script_id = models.ForeignKey(Controls_Information, on_delete=models.CASCADE)
    control_type = models.CharField(max_length=10, choices=ControlType.choices, default=ControlType.AUTOMATIC)  # Tipo de control (manual o automático)
    validation_type = models.CharField(max_length=50, choices=ValidationType.choices, default=ValidationType.SINGLE_ROW, blank=True) 
    query_sql = models.TextField(blank=True, null = True)
    expected_results = models.JSONField(blank=True, null=True)

    def __str__(self):
        return f"{self.control_script_id.index}"